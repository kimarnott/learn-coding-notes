---
tags:
  - python/package
  - python
  - data
complete: true
aliases:
  - pandas
---
[Documentation](https://pandas.pydata.org/docs/user_guide/index.html)

**pandas** is a fast, powerful, flexible and easy to use open source data analysis and manipulation tool, built on top of the [Python](https://www.python.org) programming language.

## Useful Bits

Use `.head()`, `.tail()`, `.shape` and `.columns` to explore your DataFrame and find out the number of rows and columns as well as the column names.

Look for NaN (not a number) values with `.findna()` and consider using `.dropna()` to clean up your DataFrame.    

You can access entire columns of a DataFrame using the square bracket notation: `df['column name']` or `df[['column name 1', 'column name 2', 'column name 3']]`

You can access individual cells in a DataFrame by chaining square brackets `df['column name'][index]` or using `df['column name'].loc[index]`    

The largest and smallest values, as well as their positions, can be found with methods like `.max()`, `.min()`, `.idxmax()` and `.idxmin()`    

You can sort the DataFrame with `.sort_values()` and add new columns with `.insert()`

To create an Excel Style Pivot Table by grouping entries that belong to a particular category use the `.groupby()` method

```dataview
TABLE without id file.inlinks as "Where is this used?"
WHERE file.name = this.file.name
SORT file.inlinks.order ASC 
```