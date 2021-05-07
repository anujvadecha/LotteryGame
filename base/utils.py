import string
import random


def random_string_generator(size=13, chars =  string.digits):
    return 'LT'+''.join(random.choice(chars) for _ in range(size))

def unique_transaction_id_generator():
    transaction_new_id = random_string_generator(13)
    # t_id_exists = Klass.objects.filter(transaction_id=transaction_new_id).exists()
    return transaction_new_id

