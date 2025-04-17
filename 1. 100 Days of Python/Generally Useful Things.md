# Variable Scope
Variables created inside a function are destroyed once the function has executed. 
The location (line of code) that you use a variable will determine its value.
Here n is 2 but inside my_function() n is 3. 
So printing n inside and outside the function will determine its value.

```python
n = 2
def my_function():
	n = 3
	print(n)

print(n) #Prints 2
my_function() #Prints 3
```

# Loops
break: breaks free of a loop
continue: skip this iteration of the loop (go to the next iteration)

# List Methods

```python
list = ["item 1", "item 2", "item 3"]

#Adding item to list
list.append("new_item")

#List Index
list[0] #Result: "item 1"
list[-1] #Result: "new_item"

#List Slicing
list[1:3] #Result: ["item 2", "item 3", "new_item"]
```

# Built in Functions
```python
# range(start, end, step)
for i in range(6, 0, -2)

import random
# randint(start, end). Note that start and end are both included
n = random.randint(2, 5)

# round(number, number_of_digits)
round(4.6) #Result: 5

#absolute value
abs(-4.6) #Result: 4.6
```

# Class Inheritance
When you create a new class, you can inherit the methods and properties of another class.

```python
class Animal:
	def breathe(self):
		print("breathing")
class Fish(Animal)
	def breath(self):
	super().breathe()
	print("underwater")
nemo = Fish()
nemo.breathe()
#Result: "breathing" \n "underwater"
```


