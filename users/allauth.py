from allauth.account.adapter import DefaultAccountAdapter
from django.urls import reverse
class AccountAdapter(DefaultAccountAdapter):

  def get_login_redirect_url(self, request):
    prof = request.user.get_profile()
    if prof:
        print('hello')
        return reverse('listings:my_listings')
    else:
        print('bye')
        return ('/')

  def get_signup_redirect_url(self, request):
    prof = request.user.get_profile()
    if prof:
        print('hello')
        return reverse('listings:my_listings')
    else:
        print('bye')
        customer_id = request.user.get_customer_id()
        return reverse('listings:my_messages', kwargs={'customer_pk': customer_id})