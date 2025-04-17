---
tags:
  - day
  - python
order: 72
aliases:
  - 72. Data in Pandas
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio


# General

College degrees are _very_ expensive. But, do they pay you back? Choosing Philosophy or International Relations as a major may have worried your parents, but does the data back up their fears? PayScale Inc. did a year-long survey of 1.2 million Americans with only a bachelor's degree. We'll be digging into this data and use Pandas to answer these questions:

  - Which degrees have the highest starting salaries? 
   - Which majors have the lowest earnings after college?
   - Which degrees have the highest earning potential?
   - What are the lowest risk college majors from an earnings standpoint?
   - Do business, STEM (Science, Technology, Engineering, Mathematics) or HASS (Humanities, Arts, Social Science) degrees earn more on average?
## Notes

So, today we're using google collaborate - which seems to be a cloud version of Jupyter notebook (finally, another term I've seen around loads an am now learning about)
# Packages
```python
import pandas as pd
```


> [!tip]+ Packages
> - [[Pandas]]


# Requirements and Solutions

```python
import pandas as pd

df = pd.read_csv('dataset.csv', names=['column1_name', 'column2_name',...])

pd.options.display.float_format = '{:,.2f}'.format #displays floating point numbers to 2 decimal places

df.head() #returns first five rows of df
df.tail() #returns last five rows of df
df[['col1', 'col2']].head() #returns only the columns specified

df.shape #retruns tuple of (rows, columns)
df.columns #returns object containing list of column names
df.isna() #returns df with boolean values for 'is this cell na'
clean_df = df.dropna() #drops rows that contain 'na' values

clean_df["col"].max() #returns max value in column
clean_df["col"].idxmax() #returns index of max value in column

clean_df["col"].loc[43] #returns value of column at index 43
clean_df["col"][43] #does the same thing as above
clean_df.loc[43] #returns the entire row at index 43

spread_col = clean_df['big'] - clean_df['small']
# can also use the .subtract() method.. ie. df['big'].subtract(df['small'])

clean_df.insert(1, 'Spread', spread_col) # inserts spread_col at position 1 under the heading 'Spread'

low_risk = clean_df.sort_values('Spread') #sorts the df by the specified column values (A-Z, low-high). Multiple sorting columns will sort by the first column, then sorts the second column within those groups

sort_values('col', ascending=False) #sorts in descending order

df.groupby('category_col').count() #counts the number of values, grouped by the category_col

```


<hr />

```dataviewjs
dv.view("customJS/navPY")
```

