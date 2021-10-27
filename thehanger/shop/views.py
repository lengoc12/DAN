from django.shortcuts import render
from rest_framework import viewsets, generics, status, permissions
from rest_framework.generics import ListAPIView
from rest_framework.pagination import BasePagination
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from .serializers import *
from django.db.models import F
from django.conf import settings
from django.db.models import Q
from django.utils import timezone
from .models import *


class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path="current-user")
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user, context={"request": request}).data,
                        status=status.HTTP_200_OK)

    def get(self, request):
        customer_obj = Customer.objects.get(user=request.user)
        customer_ser = CustomerSerializer(customer_obj).data
        return Response(customer_ser)


class RegisterUserView(APIView):
    def post(self, request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response({'error': False, 'message': "User Was Crated!!"})
        return Response({'error': True, 'message': "User Was Not Crated!!"})


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(methods=['get'], detail=True, url_path='products')
    def get_product(self, request, pk):
        products = Category.objects.get(pk=pk).products.filter(active=True)

        q = request.query_params.get('q')
        if q is not None:
            products = products.filter(name__icontains=q)

        return Response(ProductSerializer(products, many=True, context={"request": request}).data,
                        status=status.HTTP_200_OK)


class SliderView(APIView):
    def get(self, request):
        slider_obj = Slider.objects.all()
        slider_serializer = SliderSerializer(
            slider_obj, many=True, context={'request': request}).data
        return Response(slider_serializer)


class ColorView(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer


class SizeView(viewsets.ModelViewSet):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer


class VariantView(viewsets.ModelViewSet):
    queryset = Variant.objects.all()
    serializer_class = VariantSerializer


class CityView(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class CommentViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.RetrieveAPIView, generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path="current-user")
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user, context={"request": request}).data,
                        status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().destroy(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().partial_update(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['add_comment', 'take_action', 'rate']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['post'], detail=True, url_path='rating')
    def rate(self, request, pk):
        try:
            rating = int(request.data['rating'])
        except IndexError | ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            r = Comment.objects.update_or_create(creator=request.user, product=self.get_object(), defaults={"rate": rating})

            return Response(CommentSerializer(r).data,
                            status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='views')
    def inc_view(self, request, pk):
        v, created = ProductView.objects.get_or_create(product=self.get_object())
        v.views = F('views') + 1
        v.save()
        v.refresh_from_db()

        return Response(ProductViewSerializer(v).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path="comments")
    def get_comments(self, request, pk):
        p = self.get_object()
        return Response(
            CommentSerializer(p.comment_set.order_by("-id").all(), many=True, context={"request": self.request}).data,
            status=status.HTTP_200_OK)


class SaleProducts(viewsets.ViewSet, generics.ListAPIView):
    queryset = Product.objects.filter(active='True').exclude(discount=0)
    serializer_class = ProductSerializer


class MostViewsProducts(viewsets.ViewSet, generics.ListAPIView):
    queryset = ProductView.objects.all().order_by('views')[:15]
    serializer_class = ProductViewSerializer


class NewView(viewsets.ViewSet, generics.ListAPIView):
    queryset = Product.objects.filter(active=True).order_by('created_date')[:20]
    serializer_class = ProductSerializer


class SlideView(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Slider.objects.all()
    serializer_class = SliderSerializer


class CartView(viewsets.ViewSet, generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path="current-user")
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user, context={"request": request}).data,
                        status=status.HTTP_200_OK)


class CartItemView(viewsets.ViewSet, generics.ListAPIView, generics.UpdateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path="current-user")
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user, context={"request": request}).data,
                        status=status.HTTP_200_OK)


class OrderView(viewsets.ViewSet, generics.ListAPIView, generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path="current-user")
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user, context={"request": request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path="new-order", url_name="new-order")
    def get_new_order(self, request):
        order = Order.objects.filter(status="New")
        order_data = OrderSerializer(order, many=True, context={'request': request}).data
        return Response(order_data)

    @action(methods=['get'], detail=False, url_path="accepted-order", url_name="accepted-order")
    def get_accepted_order(self, request):
        order = Order.objects.filter(status="Accepted")
        order_data = OrderSerializer(order, many=True, context={'request': request}).data
        return Response(order_data)

    @action(methods=['get'], detail=False, url_path="preparing-order", url_name="preparing-order")
    def get_preparing_order(self, request):
        order = Order.objects.filter(status="Preparing")
        order_data = OrderSerializer(order, many=True, context={'request': request}).data
        return Response(order_data)

    @action(methods=['get'], detail=False, url_path="OnShipping-order", url_name="OnShipping-order")
    def get_on_shipping_order(self, request):
        order = Order.objects.filter(status="OnShipping")
        order_data = OrderSerializer(order, many=True, context={'request': request}).data
        return Response(order_data)

    @action(methods=['get'], detail=False, url_path="Completed-order", url_name="Completed-order")
    def get_completed_order(self, request):
        order = Order.objects.filter(status="Completed")
        order_data = OrderSerializer(order, many=True, context={'request': request}).data
        return Response(order_data)

    @action(methods=['get'], detail=False, url_path="Canceled-order", url_name="Canceled-order")
    def get_canceled_order(self, request):
        order = Order.objects.filter(status="Canceled")
        order_data = OrderSerializer(order, many=True, context={'request': request}).data
        return Response(order_data)


class SearchView(APIView):
    def get(self, request, q):
        data = {}
        posts_lookup = (Q(name__icontains=q) | Q(description__icontains=q) | Q(price__icontains=q))
        prod_obj = Product.objects.filter(active=True).filter(posts_lookup)
        data['products'] = ProductSerializer(prod_obj, many=True, context={'request': request}).data

        category_lookup = (Q(name__icontains=q))
        category_obj = Category.objects.filter(category_lookup)
        data['category'] = CategorySerializer(category_obj, many=True, context={'request': request}).data

        color_lookup = (Q(name__icontains=q))
        color_obj = Color.objects.filter(color_lookup)
        data['color'] = CategorySerializer(color_obj, many=True, context={'request': request}).data

        return Response(data)


class OrderHistoryView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(ordered='Completed', user=self.request.user)


class ProductFilterView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        category = self.request.query_params.get('category', None)
        min = self.request.query_params.get('min', 100000)
        max = self.request.query_params.get('max', 5000000)
        print(category, min, max)
        if category is None or category == 'all':
            return Product.objects.filter(price__range=(min, max))
        products = Product.objects.filter(category=category, price__range=(min, max))
        return products

