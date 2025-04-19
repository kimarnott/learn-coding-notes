---
tags:
  - day
  - python
order: 77
aliases:
  - 77. NumPy
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio


# General
No Data Science course can be complete without learning NumPy (**Numerical Python**). NumPy is a Python library that’s used in almost every field of science and engineering. It’s practically **THE** standard for working with numerical data in Python. The case studies for how NumPy is being used speak for themselves 😮

So far, we’ve been using Pandas, which is built on top of NumPy. Think of Pandas as a high-level data manipulation tool that includes functionality for working with time-series or for grouping, joining, merging and finding missing data (i.e., everything we’ve been doing so far). NumPy on the other hand shines with low-level tasks, like doing serious math and calculations.

**Today you'll learn:**
- How to leverage the power 💪 of NumPy's ndarrays.    
- How to access individual values and subsets inside an n-dimensional array.    
- How broadcasting 📣 works with ndarrays.    
- How to do linear algebra with NumPy.    
- How to generate points that you can plot on a chart.    
- How to manipulate images as ndarrays.

 >[!success]+ Learning Points & Summary
>- Create arrays manually with `np.array()`    
>- Generate arrays using  `.arange()`, `.random()`, and `.linspace()`    
>- Analyse the shape and dimensions of a ndarray    
>- Slice and subset a ndarray based on its indices    
>- Do linear algebra like operations with scalars and matrix multiplication    
>- Use NumPys broadcasting to make ndarray shapes compatible    
>- Manipulate images in the form of ndarrays


## `ndarray`
The crown jewel of NumPy is the `ndarray`. The **ndarray** is a _homogeneous n-dimensional array_ object. What does that mean? 🤨

A Python List or a Pandas DataFrame can contain a mix of strings, numbers, or objects (i.e., a mix of different types). **Homogenous** means all the data have to have the same data type, for example all floating-point numbers.

And **n-dimensional** means that we can work with everything from a single column (1-dimensional) to the matrix (2-dimensional) to a bunch of matrices stacked on top of each other (n-dimensional).

>[!tip]- 1-Dimensional Arrays (Vectors)
>```python
># create new ndarray from scratch
>my_array = np.array([1.1, 9.2, 8.1, 4.7])
>
># show rows and columns
>my_array.shape
>
># Accessing elements by index
>my_array[2]
>
># show dimensions of an array
>my_array.ndim
>```

>[!tip]- 2-Dimensional Arrays (Matrices)
>```python
># create new ndarray from scratch
>array_2d = np.array([[1, 2, 3, 9], [5, 6, 7, 8]])
>
>print(f'array_2d has {array_2d.ndim} dimensions') # 2
>print(f'Its shape is {array_2d.shape}') # (2, 4)
>print(f'It has {array_2d.shape[0]} rows and {array_2d.shape[1]} columns') # [2, 4]
>print(array_2d) # [[1 2 3 9] 
>				#  [5 6 7 8]]
>				
># Access the 3rd value in the 2nd row
>array_2d[1,2]
>
># Access all the values in the first row
>array_2d[0, :]
>```

>[!tip]- N-Dimensional Arrays (Tensors)
>An array of 3 dimensions (or higher) is often referred to as a ”tensor”. Yes, that’s also where Tensorflow, the popular machine learning tool, gets its name. A tensor simply refers to an n-dimensional array.
>```python
>mystery_array = np.array([[[0, 1, 2, 3],
>						   [4, 5, 6, 7]],
>						    
>					  	  [[7, 86, 6, 98],
>					   	   [5, 1, 0, 4]],
>						
>					  	  [[5, 36, 32, 48],
>					   	   [97, 0, 27, 18]]])
># This array has 3 dimension, with a shape (3, 2, 4)
>
># Access the last value - remember lists start at 1, and work from outside in
>my_val = mystery_array[2, 1, 3]
>
># Retrieve all the elements on the 3rd axis that are at
># position 2 on the first axis and position 1 on the second axis.
>mystery_array[2, 1, :] # returns: array([97, 0, 27, 18])
>
># All the first elements on axis number 3
>mystery_array[:, :, 0] # returns: array([[0, 4], [7, 5], [5, 97]])
>```

>[!tip]- `.arrange()`
>You can use `.arrange()` to create a vector with values ranging from your inputs
>```python
>a = np.arrange(10, 30)
># returns [10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29]
>```

>[!info]- List Slicing Recap
>You can use list slicing to get subsets of arrays:
>```python
>a[-3:] # last 3 values
>a[3:6] # values between position 3 (inclusive) and 6 (exclusive)
>a[12:] # all values except the first 12
>a[::2] # every second value
>```

>[!tip]- Reverse the Order of an Array
>To reverse the order of an array, you can either use the (double) colon operator once again or use the built-in `.flip()` function. Either way works.
>```python
>np.flip(a)
># or
>a[::-1]
>```

>[!tip]- `.nonzero()`
>You can use the built-in `.nonzero()` function to print out all the non-zero elements. You can use it like so:
>```python
>b = np.array([6,0,9,0,0,5,0])
>nz_indices = np.nonzero(b)  # note this is a tuple
>```

>[!tip]- `.random()`
>The .random() function is another way to quickly create a ndarray, just like `.arange()`. The .random() function lives under np.random so you'll either have to import random
from numpy.random import random
>```python
>z = random((3,3,3))
>```
>or use the full path to call it.
>```python
>z = np.random.random((3,3,3)) # without an import statement for random
>print(z.shape)  # returns: (3, 3, 3)
>```

>[!tip]- `.linspace()`
>The `.linspace()` function is very similar to `.arange()` and great for generating evenly spaced numbers over an interval. To generate the vector use:
>```python
>x = np.linspace(0, 100, num=9)
>```
>A common use-case for `.linspace()` is to generate the points that you'd like to plot on a chart.
>```python
>y = np.linspace(start=-3, stop=3, num=9)
>plt.plot(x, y)
>```

## Broadcasting, Scalars, and Matrix Multiplication
NumPy is designed to do math (and do it well!). This means that NumPy will treat vectors, matrices and tensors in a way that a mathematician would expect. 

>[!tip]- Linear Algebra with Vectors
>
>For example, if you had two vectors and you add them together, the result will be a ndarray where all the elements have been added together. Multiplying the two vectors together also results in an element by element operation.
>
>```python
>v1 = np.array([4, 5, 2, 7])
>v2 = np.array([2, 1, 3, 3])
>
>v1 + v2 # returns: 
>array([ 6, 6, 5, 10])
>
>v1 * v2 # returns:
>array([ 8, 5, 6, 21])
>```
>
>If we had two Python Lists, adding them together would just concatenate the lists, and multiplying them would not work at all.
>```python
>list1 = [4, 5, 2, 7]
>list2 = [2, 1, 3, 3]
>list1 + list2 # output: [4, 5, 2, 7, 2, 1, 3, 3]
>list1 * list2 # error!
>```

>[!tip]- Broadcasting
>Now, oftentimes you'll want to do some sort of operation between an array and a single number. In mathematics, this single number is often called a **scalar**. For example, you might want to multiply every value in your NumPy array by 2.
>
>In order to achieve this result, NumPy will make the shape of the smaller array - our scalar - compatible with the larger array. This is what the documentation refers to when it mentions the term "broadcasting".
>
>The same rules about 'expanding' the smaller ndarray hold true for 2 or more dimensions. We can see this with a 2-Dimensional Array:
>
>```python
>array_2d = np.array([[1, 2, 3, 4], 
>                      [5, 6, 7, 8]])
>
>array_2d + 10
># array([[11, 12, 13, 14],
>#       [15, 16, 17, 18]])
>
>array_2d * 5
># array([[ 5, 10, 15, 20],
>#       [25, 30, 35, 40]])
>```
>The scalar operates on an element by element basis.

>[!tip]- Matrix Multiplication
>But what if we're not multiplying our ndarray by a single number? What if we multiply it by another vector or a 2-dimensional array? In this case, we follow [the rules of linear algebra](https://en.wikipedia.org/wiki/Matrix_multiplication#Illustration).
>Let's multiply `a1` with `b1` by using the [`.matmul()`](https://numpy.org/doc/stable/reference/generated/numpy.matmul.html) function or the @ operator.
>
>```python
>a1 = np.array([[1, 3], # 4 rows and 2 columns
>               [0, 1],
>               [6, 2],
>               [9, 7]])
>  
>b1 = np.array([[4, 1, 3], # 2 rows and 3 columns
>               [5, 8, 5]])
>
>c = np.matmul(a1, b1) # or 
>c= a1 @ b1
># Dimensions of matrix multiply result: (4x2)*(2x3)=(4x3)
># array([[19, 25, 18],
>#        [ 5,  8,  5],
>#        [34, 22, 28],
>#        [71, 65, 62]])
>
>```

## Manipulating Images as ndarrays
Images are nothing other than a collection of pixels. And each pixel is nothing other than value for a colour. And any colour can be represented as a combination of red, green, and blue (RGB).

>[!tip]- Displaying Array as an Image: `.imshow(array)`
>When you have a 3-dimensional array with values between 0 and 1, we can use Matplotlib to interpret these values as the red-green-blue (RGB) values for a pixel.
>```python
>noise = np.random.random((128, 128, 3))
>plt.imshow(noise)
>```
>![[Noise Color.png]]
>
>There are three matrices stacked on top of each other - one for the red values, one for the green values and one for the blue values. Each matrix has a 128 rows and 128 columns, so the image resolution is 128x128.

>[!tip]- Playing with Images
>```python
>img = misc.face() # an array with shape (768, 1024, 3)
>
># these define the Y_linear (linear luminance), the values represent the how bright the RGB colours are to the human eye
>grey_vals = np.array([0.2126, 0.7152, 0.0722])
>
># convert the img array to sRGB (where all values are between 0 and 1)
>sRGB_array = img / 255
>
># convert image to greyscale
>img_gray = sRGB_array @ grey_vals
># or use
>img_gray = np.matmul(sRGB_array, grey_vals)
>
># if you leave out the cmap then the function won't know that we're dealing with a black and white image
>plt.imshow(img_gray, cmap='gray')
>
># flip the image (upside down)
>plt.imshow(np.flip(img_gray), cmap='gray')
>
># rotate an image
>plt.imshow(np.rot90(img))
>
>#solarise (invert) colour images
>solar_img = 255 - img
>plt.imshow(solar_img)
>```

>[!info]- Your Own Images
>Use the PIL package to import your own image:
>```python
>my_img = Image.open(file_name)
>img_array = np.array(my_img)
>```

# Packages
```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import misc # contains an image of a racoon!
from PIL import Image # for reading image files
```


> [!tip]+ Packages
> - [[Numpy]]
> - [[Matplotlib]]
> - [[scipy]]
> - [[PIL]]

<hr />

```dataviewjs
dv.view("customJS/navPY")
```

