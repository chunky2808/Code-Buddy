from django.db import models
from django.contrib.auth.models import User

from django.utils import timezone

class Space(models.Model):
	name = models.TextField()
	label = models.SlugField(unique=True)

	def __str__(self):
		return self.label

class Message(models.Model):
	room = models.ForeignKey(Space,related_name='messages')
	handle = models.TextField()
	message = models.TextField()
	timestamp = models.DateTimeField(default = timezone.now, db_index = True)
	#by default db_index is true for primary key of model to optimize request,but enabling here also,to optimize request

	def __str__(self):
		return self.message
