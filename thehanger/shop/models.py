from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.forms import ModelForm
from django.utils.safestring import mark_safe
from rest_framework.authtoken.models import Token
from django.db.models import Avg, Count


User = get_user_model()


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, blank=True, null=True)
    mobile = models.CharField(max_length=16)
    username = models.CharField(
        max_length=150, unique=True, blank=True, null=True)

    def __str__(self):
        return self.user.email


@receiver(post_save, sender=User)
def createCustomer(sender, instance, created, *args, **kwargs):
    if created:
        Customer.objects.create(user=instance)
        Token.objects.create(user=instance)


@receiver(post_save, sender=Customer)
def createUsername(sender, instance, created, *args, **kwargs):
    if created:
        instance.username = f"customer{instance.id}"
        instance.save()


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='category/', null=False)

    def __str__(self):
        return self.name

class Product(models.Model):
    OPTIONS = (
        ('None', "None"),
        ('Color', 'Color'),
        ('Size', 'Size'),
        ('Color - Size', 'Color - Size'),
    )

    name = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,  related_name="products",)
    description = models.TextField()
    image = models.ImageField(upload_to='products/', null=False)
    price = models.IntegerField()
    discount = models.IntegerField()
    active = models.BooleanField(default=True)
    option = models.CharField(max_length=15, choices=OPTIONS, default='None')
    created_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def final_price(self):
        return self.price-self.discount*self.price/100

    def image_tag(self):
        if self.image.url is not None:
            return mark_safe('<img src="{}" height="50" />'.format(self.image.url))
        else:
            return ""

    def average_review(self):
        reviews = Comment.objects.filter(product=self, status='True').aggregate(average=Avg('rating'))
        avg = 0
        if reviews["average"] is not None:
            avg = float(reviews["average"])
        return avg

    def count_review(self):
        reviews = Comment.objects.filter(product=self, status='True').aggregate(count=Count('id'))
        cnt = 0
        if reviews["count"] is not None:
            cnt = int(reviews["count"])
        return cnt


class Images(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    image = models.ImageField(upload_to='products/', default=None)

    def __str__(self):
        return self.name


class Comment(models.Model):

    COMMENT_STATUS = (
        ('New', 'New'),
        ('True', 'True'),
        ('False', 'False'),
    )

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    comment = models.CharField(max_length=255)
    RATING_CHOICES = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    )
    rating = models.IntegerField(choices=RATING_CHOICES, default=1)
    status = models.CharField(max_length=15, choices=COMMENT_STATUS, default='New')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.comment


class Color(models.Model):
    name = models.CharField(max_length=15, unique=True)
    code = models.CharField(max_length=10)

    def __str__(self):
        return self.name

    def color_tag(self):
        if self.code is not None:
            return mark_safe('<p style="background-color:{}">Color </p>'.format(self.code))


class Size(models.Model):
    name = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.name


class Variant(models.Model):
    name = models.CharField(max_length=150, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE,  related_name="variants",)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, blank=True, related_name="variants")
    size = models.ForeignKey(Size, on_delete=models.SET_NULL, null=True, blank=True, related_name="variants")
    image_id = models.IntegerField(blank=True, null=True, default=0)
    quantity = models.IntegerField()

    def __str__(self):
        return self.name

    def image(self):
        img = Images.objects.get(id=self.image_id)
        if img.id is not None:
             varimage=img.image.url
        else:
            varimage=""
        return varimage

    def image_tag(self):
        img = Images.objects.get(id=self.image_id)
        if img.id is not None:
            return mark_safe('<img src="{}" height="50"/>'.format(img.image.url))
        else:
            return ""


class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.customer.user.email

    #@property
    #def total(self):
    #    tong = 0
    #    for item in self.products.all():
    #        tong += int(item.quantity)*int(item.product.final_price)
    #    return tong

    #@property
    #def quantity(self):
    #    return sum(item.quantity for item in self.products.all())


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True, related_name="items")
    variant = models.ForeignKey(Variant, on_delete=models.SET_NULL, blank=True, null=True, related_name="items")  # relation with varinat
    quantity = models.PositiveIntegerField(default=0)

    @property
    def price(self):
        return self.product.price

    @property
    def final_price(self):
        return self.product.price-self.product.price*self.product.discount/100

    @property
    def image(self):
        return self.variant.image_tag


class City(models.Model):
    name = models.CharField(max_length=50, unique=True)
    fee = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS = (
        ('New', 'New'),
        ('Accepted', 'Accepted'),
        ('Preparing', 'Preparing'),
        ('OnShipping', 'OnShipping'),
        ('Completed', 'Completed'),
        ('Canceled', 'Canceled'),
    )
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE, )
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    phone = models.CharField(blank=True, max_length=20)
    address = models.CharField(blank=True, max_length=150)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=10,choices=STATUS, default='New')
    note = models.CharField(blank=True, max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    PAYMENT_METHOD = (
        ('Paypal', "Paypal"),
        ("Cash", "Cash")
    )
    payment_method = models.CharField(max_length=15, choices=PAYMENT_METHOD, default="Cash")

    @property
    def fee(self):
        return self.city.fee

    def __str__(self):
        return self.customer.user.email


class Slider(models.Model):
    image = models.ImageField(upload_to='slides/', default=None)
    caption = models.CharField(max_length=255)

    def image_tag(self):
        if self.image.url is not None:
            return mark_safe('<img src="{}" height="50" />'.format(self.image.url))
        else:
            return ""


class ProductView(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)
    product = models.OneToOneField(Product, on_delete=models.CASCADE)


