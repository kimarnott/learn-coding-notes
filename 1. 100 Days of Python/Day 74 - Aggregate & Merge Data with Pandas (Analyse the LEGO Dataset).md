---
tags:
  - day
  - python
order: 74
aliases:
  - 74. Aggregate and Merge with Pandas
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio
# General
Today we're going to be diving deep into a dataset all about LEGO, which will help us answer a whole bunch of interesting questions about the history of the company, their product offering, and which LEGO set rules them all:

- What is the most enormous LEGO set ever created and how many parts did it have?  
- In which year were the first LEGO sets released and how many sets did the company sell when it first launched?    
- Which LEGO theme has the most sets? Is it Harry Potter, Ninjago, Friends or something else?    
- When did the LEGO company really take-off based on its product offering? How many themes and sets did it release every year?    
- Did LEGO sets grow in size and complexity over time? Do older LEGO sets tend to have more or fewer parts than newer sets?

>[!success]+ Learning Points & Summary
>In this lesson we looked at how to:
>- use HTML Markdown in Notebooks, such as section headings `#` and how to embed images with the `<img>` tag.
>- combine the `groupby()` and `count()` functions to aggregate data
>- use the `.value_counts()` function
>- slice DataFrames using the square bracket notation e.g., `df[:-2]` or `df[:10]`
>- use the `.agg()` function to run an operation on a particular column
>- `rename()` columns of DataFrames
>- create a line chart with two separate axes to visualise data that have different scales.
>- create a scatter plot in Matplotlib
>- work with tables in a relational database by using primary and foreign keys
>- `.merge()` DataFrames along a particular column
>- create a bar chart with Matplotlib

## More Pandas

>[!tip]- Pandas `.agg()` function
>
>Often you find yourself needing to summarise data. This is where the `.groupby()` function comes in really handy. However, sometimes you want to run even more operations based on a particular DataFrame column. This is where the [`.agg()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.agg.html) method comes in.
>
>Note, the `.agg()` method takes a dictionary as an argument. In this dictionary, we specify which operation we'd like to apply to each column, e.g: 
>
>```python
>.agg({col: pd.Series.nunique)})
>``` 

>[!tip]- Two Separate Axes
>
>We need to be able to configure and plot our data on two separate axes on the same chart. This involves getting hold of an axis object from Matplotlib.
>
>
>```python
>ax1 = plt.gca() # get current axes
>ax2 = ax1.twinx() 
>
>ax1.plot(df1.index, df2.col, color='line-colour')
>ax2.plot(df2.index, df2.col, color='line-colour')
>
>#You can add styling to each dataset
>ax1.set_xlabel('X-Label Title')
>ax1.set_ylabel('Y-Label Title', color='title-label-colour')
>```
>
>We then create another axis object: `ax2`. The key thing is that by using the `.twinx()` method allows `ax1` and `ax2` to share the same x-axis.

>[!success] Filters on Columns
>```python
>df[df.col == "filter"]
>```

>[!tip]- Merging
>Let's use the [`.merge() method`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.merge.html?highlight=merge#pandas.DataFrame.merge) to combine two separate DataFrames into one. The merge method works on columns with the same **name** in both DataFrames.
>
>To [.merge()](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.merge.html) two DataFrame along a particular column, we need to provide our two DataFrames and then the **column name** on which to merge.

# Packages
```python
import pandas as pd
import matplotlib.pyplot as plt
```


> [!tip]+ Packages
> - [[Pandas]]
> - [[Matplotlib]]


# Requirements and Solutions
```python
df = pd.read_csv("xxx.csv")
df.nunique() #counts the number of unique data in each column

#count the number of unique data in 'col'
df.col.value_counts()
df('col').nunique()

#filter by a column value
df[df['col'] == filter_value]

#exclude some values from plot using list slicing
plt.plot(df.index[:-2], df.col[:-2])

#aggregate using unique values for 'theme_id' column, grouped by year
themes_by_year = df_sets.groupby('year').agg({'theme_id': pd.Series.nunique})

#configure plot with two axes
ax1 = plt.gca() #get current axis
ax2 = ax1.twinx()

#add data from two sources to different aces
ax1.plot(sets_per_year.index[:-2], sets_per_year.set_num[:-2], color='g')
ax2.plot(themes_by_year.index[:-2], themes_by_year.nr_themes[:-2], 'b')

#some styling to make the plot clearer
ax1.set_xlabel('Year')
ax1.set_ylabel('Number of Sets', color='green')
ax2.set_ylabel('Number of Themes', color='blue')

#aggregate using mean value of 'num_parts', grouped by year
parts_per_set = df_sets.groupby('year').agg({'num_parts': pd.Series.mean})

#merge themes with number of sets per theme
themes = pd.read_csv('themes.csv')
set_theme_count = df_sets["theme_id"].value_counts()

#merge into DataFrame. Note that the dict keys will be the DF column names
df_set_theme_count = pd.DataFrame({'id':set_theme_count.index,
                                   'set_count':set_theme_count.values})

#merge DataFrames, df_set_theme_count and themes, using the id column
#this puts the set_count column we created with the rest of the data
merged_df = pd.merge(df_set_theme_count, themes, on='id')

#plot bar chart of merged_df
plt.figure(figsize=(14,8))
plt.xticks(fontsize=14, rotation=45) #rotate labels to 45degrees for readability
plt.yticks(fontsize=14)
plt.ylabel('Nr of Sets', fontsize=14)
plt.xlabel('Theme Name', fontsize=14)

plt.bar(merged_df.name[:10], merged_df.set_count[:10]) #take the first 10
```

<hr />

```dataviewjs
dv.view("customJS/navPY")
```

