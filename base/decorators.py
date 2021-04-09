import timeit



def timer(function):
  def new_function(*args, **kwargs):
    start_time = timeit.default_timer()
    data = function(*args, **kwargs)
    elapsed = timeit.default_timer() - start_time
    print('Function "{name}" took {time} seconds to complete.'.format(name=function.__name__, time=elapsed))
    return data
  return new_function


def base_api():
    def decorator(cls):
      for name, obj in vars(cls).items():
        if callable(obj):
          try:
            obj = obj.__func__  # unwrap Python 2 unbound method
          except AttributeError:
            pass  # not needed in Python 3
          setattr(cls, name, timer(obj))
      return cls
    return decorator
