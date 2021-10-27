from django.contrib import admin
from django.urls import path

from .models import *
import admin_thumbnails


@admin_thumbnails.thumbnail('image')
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'image_thumbnail']
    search_fields = ['name', 'id', ]


class ProductVariantsInline(admin.TabularInline):
    model = Variant
    readonly_fields = ('image_tag',)
    extra = 1
    show_change_link = True


@admin_thumbnails.thumbnail('image')
class ProductImageInline(admin.TabularInline):
    model = Images
    readonly_fields = ('id',)
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'active', 'image_tag', 'price', 'discount', 'final_price']
    list_filter = ['category']
    readonly_fields = ('image_tag',)
    inlines = [ProductImageInline, ProductVariantsInline]


class CommentAdmin(admin.ModelAdmin):
    list_display = ['comment', 'status', 'created_date']
    list_filter = ['status']
    readonly_fields = ('id', 'comment', 'customer', 'product', 'rating',)


class ColorAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'color_tag']
    ordering = ["name"]


class SizeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', ]


@admin_thumbnails.thumbnail('image')
class ImagesAdmin(admin.ModelAdmin):
    list_display = ['image', 'name', 'image_thumbnail']


class VariantAdmin(admin.ModelAdmin):
    list_display = ['name', 'product', 'color', 'size', 'quantity', 'image_tag']


class CartItemInline(admin.TabularInline):
    model = CartItem
    list_display = ['cart', 'product', 'variant', 'price', 'final_price', 'quantity', ]


class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product', 'variant', 'price', 'final_price', 'quantity', 'image']


class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer']
    search_fields = ['customer', ]
    list_filter = ['customer']
    inlines = [CartItemInline, ]


class CityAdmin(admin.ModelAdmin):
    list_display = ["id", "name", 'fee']
    ordering = ["name"]


class OrderAdmin(admin.ModelAdmin):
    list_display = ['cart', 'address', 'city', 'fee', 'status']
    search_fields = ['cart', 'status', ]
    list_filter = ['status']


class CustomerAdmin(admin.ModelAdmin):
    list_display = ['name', 'username', 'mobile']
    ordering = ['name']


class SliderAdmin(admin.ModelAdmin):
    list_display = ['caption', 'image_tag']


admin.site.site_header = 'THE HANGER'

admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Color, ColorAdmin)
admin.site.register(Size, SizeAdmin)
admin.site.register(Variant, VariantAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(Images, ImagesAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Slider, SliderAdmin)
admin.site.register(ProductView)
