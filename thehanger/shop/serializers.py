from rest_framework import serializers
from rest_framework.fields import Field
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import *
from django.contrib.auth import get_user_model


User = get_user_model()


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'email',)
        extra_kwargs = {'password': {"write_only": True, 'required': True}, }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, ).data
        return response


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(ModelSerializer):

    class Meta:
        model = Product
        fields = ["id", "name", "category", "description", "image", "price", "discount", "active", "option", "final_price"]


class ProductDetail(ModelSerializer):
    rate = SerializerMethodField()

    def get_rate(self, lesson):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            r = lesson.rating_set.filter(creator=request.user).first()
            if r:
                return r.rate

        return -1

    class Meta:
        model = ProductSerializer.Meta.model
        fields = ProductSerializer.Meta.fields + ['content', "rate"]


class ProductViewSerializer(ModelSerializer):
    class Meta:
        model = ProductView
        fields = ["id", "views", "product"]

        def to_representation(self, instance):
            response = super().to_to_representation(instance)
            request = self.context.get('request')
            response ['product'] = ProductSerializer(instance.product, context={'request': request}).data
            return response


class SliderSerializer(ModelSerializer):
    class Meta:
        model = Slider
        fields ="__all__"


class CommentSerializer(ModelSerializer):
    creator = SerializerMethodField()

    def get_creator(self, comment):
        return CustomerSerializer(comment.creator, context={"request": self.context.get('request')}).data

    class Meta:
        model = Comment
        fields = ["id", "product", "creator", "comment", "rating"]


class ColorSerializer(ModelSerializer):
    class Meta:
        model = Color
        fields = "__all__"


class SizeSerializer(ModelSerializer):
    class Meta:
        model = Size
        fields = "__all__"


class VariantSerializer(ModelSerializer):
    color = ColorSerializer()
    size = SizeSerializer()
    product = ProductSerializer()

    class Meta:
        model = Variant
        fields = "__all__"


class CitySerializer(ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"


class VariantDetailSerializer(ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
         model = Variant
         fields = ['id',
                    'name',
                    'product',
                    'color',
                    'size',
                   ]

    def get_product(self, obj):
        return ProductSerializer(obj.product).data


class CartItemSerializer(ModelSerializer):
    product = ProductSerializer(read_only=True)
    variant = VariantDetailSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'variant', 'final_price']



class CartSerializer(ModelSerializer):
    #products = CartItemSerializer()
    customer = CustomerSerializer()

    class Meta:
        model = Cart
        total = Field(source='total')
        total_cart_products = Field(source='total_cart_products')
        fields = ['id', 'customer',]


class OrderDetailSerializer(ModelSerializer):
    cart = CartSerializer()

    class Meta:
        model = Order
        fields = ["id", "cart", "status"]


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
        depth = 1


class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"







