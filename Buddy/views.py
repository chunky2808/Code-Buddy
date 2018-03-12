from django.shortcuts import render
from .models import Space,Message

def chat_space(request,label):
	space , created = Space.objects.get_or_create(label=label)
	#create the label if it does not exsits
	messages = reversed(space.messages.order_by('-timestamp')[:50])

	return render(request,"space.html",{'space':space,'messages':messages,})


# Create your views here.
