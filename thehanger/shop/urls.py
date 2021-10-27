from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views
from rest_framework.authtoken.views import obtain_auth_token

from .views import ProfileView, RegisterUserView, MostViewsProducts, ProductFilterView, OrderHistoryView

router = routers.DefaultRouter()
router.register('categories', views.CategoryViewSet)
router.register('colors', views.ColorView)
router.register('sizes', views.SizeView)
router.register('variants', views.VariantView)
router.register('cities', views.CityView)
router.register('products', views.ProductViewSet)
router.register('comments', views.CommentViewSet)
router.register('slides', views.SlideView)
router.register('carts', views.CartView)
router.register('cartitems', views.CartItemView)
router.register('orders', views.OrderView)
router.register('newproducts', views.NewView, 'newproducts')
router.register('mostviewsproducts', views.MostViewsProducts, 'mostviews')
router.register('sale', views.SaleProducts, 'sale')

urlpatterns = [
    path('', include(router.urls)),
    path('oauth2-info/', views.AuthInfo.as_view()),
    path('search/<str:q>/', views.SearchView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('register/', RegisterUserView.as_view()),
    path('product-filter/', ProductFilterView.as_view(), name='product-filter'),
    path('order-list/', OrderHistoryView.as_view(), name='order-list'),
]