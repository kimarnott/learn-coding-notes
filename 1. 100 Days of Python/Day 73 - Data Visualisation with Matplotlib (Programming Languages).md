---
tags:
  - day
  - python
order: 73
aliases:
  - 73. Matplotlib
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio
# General

**Analyse the Popularity of Different Programming Languages over Time.**

The oldest programming language still in use today is FORTRAN, which was developed in 1957. Since then many other programming languages have been developed. But which programming language is the most popular? Which programming language is the Kim Kardashian of programming languages; the one people just can't stop talking about? 

StackOverflow will help us answer this burning question. Each post on Stack OverFlow comes with a Tag. And this Tag can be the name of a programming language.

To figure out which language is the most popular, all we need to do is count the number of posts on Stack Overflow that are tagged with each language. The language with the most posts wins!

>[!success]+ Learning points and summary:
>- used`.groupby()` to explore the number of posts and entries per programming language
>- converted strings to Datetime objects with `to_datetime()` for easier plotting    
>- reshape our DataFrame by converting categories to columns using `.pivot()`    
>- use `.count()` and `isna().values.any()` to look for NaN values in our DataFrame, which we then replaced using `.fillna()`    
>- create (multiple) line charts using `.plot()` with a for-loop    
>- style our charts by changing the size, the labels, and the upper and lower bounds of our axis.    
>- add a legend to tell apart which line is which by colour    
>- smooth out our time-series observations with `.rolling().mean()` and plotted them to better identify trends over time.

## More Pandas

>[!tip]- Selecting an Individual Cell
>
>Let's take a closer look at the 'DATE' column in our DataFrame. We can use the double square bracket notation to look at the second entry in the column: 
> ```
> df['DATE'][1]
> ```
>Alternatively, for column names no spaces, we can also use the dot-notation:
>```
>df.DATE[1]
>```
>
>I prefer the square bracket notation for column names since it's more flexible, but with the dot notation, you get to use autocomplete, which is also nice.

>[!tip]- Inspecting the Data Type
>When we type check the contents of a date cell, we see that we are not dealing with a date object, but rather with a string.
>
>This is not very handy. Not only will the string format always show the unnecessary 00:00:00, but we also don't get the benefit of working with Datetime objects, which know how to handle dates and times. Pandas can help us convert the string to a timestamp using the [to_datetime()](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.to_datetime.html) method.

>[!tip]- The [**.pivot()**](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.pivot.html) **method**
>
>Sometimes you want to convert your DataFrame so that each category has its own column. For example, suppose you needed to take the table below and create a separate column for each actor, where each row is the Age of the actor:
>![](https://img-c.udemycdn.com/redactor/raw/2020-09-23_14-13-02-d87f678153b7f925e4fba57d50e6be42.png)
>
>How would you do this with the DataFrame below? 
>
>```python
>test_df = pd.DataFrame({'Age':[...], 'Actor': [...], 'Power': [...]})
>```
>
>The easiest way to accomplish this is by using the `.pivot()` method in Pandas. Try the example for yourself. The thing to understand is how to supply the correct aguments to get the desired outcome. The index are the categories for the rows. The columns are the categories for the columns. And the values are what you want in the new cells. 
>
>```python
>pivoted_df = test_df.pivot(index='Age', columns='Actor', values='Power')
>```
> 
>However, there's one very important thing to notice. What happens if a value is missing? In the example above there's no value for old Sylvester. In this case, the .pivot() method will insert a NaN value.

>[!tip]- Dealing with NaN Values
>
>In this case, we don't want to drop the rows that have a NaN value. Instead, we want to substitute the number 0 for each NaN value in the DataFrame. We can do this with the `.fillna()` method.
> ```python
>reshaped_df.fillna(0, inplace=True)
>``` 
>The `inplace` argument means that we are updating reshaped_df. Without this argument we would have to write something like this:
> ```python
>reshaped_df = reshaped_df.fillna(0) 
>``` 
>We can check if there are any NaN values left in the entire DataFrame with this line:
> ```python
>reshaped_df.isna().values.any()
>``` 
>Here we are using the `.isna()` method that we've used before, but we're chaining two more things: the `values` attribute and the `any()` method. This means we don't have to search through the entire DataFrame to spot if `.isna()` is True.

## Matplotlib

>[!tip]- Styling Charts
Let's look at a couple of methods that will help us style our chart:
> - `.figure()` - allows us to resize our chart
> - `.xticks()` - configures our x-axis
> - `.yticks()` - configures our y-axis
> - `.xlabel()` - add text to the x-axis
> - `.ylabel()` - add text to the y-axis
> - `.ylim()` - allows us to set a lower and upper bound

>[!tip]- Smoothing out Time-Series Data
>A useful technique to make a trend apparent is to smooth out the observations by taking an average. By averaging say, 6 or 12 observations we can construct something called the rolling mean. Essentially we calculate the average in a window of time and move it forward by one observation at a time.
>
>Since this is such a common technique, Pandas actually two handy methods already built-in: [rolling()](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.rolling.html) and [mean()](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.window.rolling.Rolling.mean.html). We can chain these two methods up to create a DataFrame made up of the averaged observations.

# Packages

> [!tip]+ Packages
> - [[Pandas]]
> - [[Matplotlib]]


# Requirements and Solutions


```python
import pandas as pd
import matplotlib.pyplot as plt

#First, we import pandas and then we can call read_csv(), where we can provide some additional arguments, like the names for our columns.
df = pd.read_csv('QueryResults.csv', names=['DATE', 'TAG', 'POSTS'], header=0)
#Setting the header row to 0 allows us to substitute our own column names.

#Count the number of entries in each column of the dataframe
df.count()
#Note that .count() will actually tell us the number of non-NaN values in each column.

#Calculate the total number of post per language. Which Programming language has had the highest total number of posts of all time?
df.groupby('TAG').sum("POSTS").sort_values('POSTS', ascending=False)

# How many months of data exist per language? Which language had the fewest months with an entry?
df.groupby('TAG').count().sort_values('DATE', ascending=False)

# Let's fix the date format to make it more readable. We need to use Pandas to change format from a string of "2008-07-01 00:00:00" to a datetime object with the format of "2008-07-01"
type(df["DATE"][1]) # returns: str
df["DATE"] = pd.to_datetime(df["DATE"]) #convert str date to datetime

#pivot table to have dates as rows, languages as columns, and number of posts as data values
reshaped_df = df.pivot(index="DATE", columns="TAG", values="POSTS")

reshaped_df.fillna(0, inplace=True) #replace 'na' values with 0

#check to see if there are any 'na' values
reshaped_df.isna().values.any()

#PLOT DATA with Matplotlib

plt.figure(figsize=(16,10)) #resize chart

plt.xticks(fontsize=14) #change fontsize on axis ranges (ticks)
plt.yticks(fontsize=14)

plt.xlabel("Date", fontsize=14) #Rename and change font size of axis labels
plt.ylabel("Number of Posts", fontsize=14)

plt.ylim(0, 35000) #set y-axis limits

#plot line chart of language popularity over time (index)
for column in reshaped_df.columns:
    plt.plot(reshaped_df.index, reshaped_df[column],
             linewidth=3, label=reshaped_df[column].name)

#for a smoothed out chart (rolling mean - averaging 6 points)
roll_df = reshaped_df.rolling(window=6).mean()
for column in roll_df.columns:
	plt.plot(roll_df.index, roll_df[column],
			 linewidth=3, label=roll_df[column].name)

plt.legend(fontsize=16) #put in a legend so we can tell which line is which

```

<hr />

```dataviewjs
dv.view("customJS/navPY")
```

