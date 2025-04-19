---
tags:
  - day
  - python
order: 76
aliases:
  - 76. Plotly
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio


# General
**Today you'll learn:**
- How to quickly remove duplicates    
- How to remove unwanted symbols and convert data into a numeric format    
- How to wrangle columns containing nested data with Pandas    
- How to create compelling data visualisations with the plotly library    
- Create vertical, horizontal and grouped bar charts    
- Create pie and donut charts for categorical data    
- Use colour scales to make beautiful scatter plots

>[!success]+ Learning Points & Summary
>In this lesson we looked at how to:
>- Pull a random sample from a DataFrame using `.sample()`
>- How to find duplicate entries with `.duplicated()` and `.drop_duplicates()`
>- How to convert string and object data types into numbers with `.to_numeric()`
>- How to use plotly to generate beautiful pie, donut, and bar charts as well as box and scatter plots
## More Pandas and Plotly

>[!tip]- `.drop()`
>Drop columns from DataFrame
>```python
>df.drop(columns=['col1', 'col2'], axis=1, inplace=True)
>```

>[!tip]- `.drop_duplicates()`
>Drop duplicated rows from DataFrame, based on the data contained in the specified subsets
>```python
>df.drop_duplicates(subset=['col1', 'col2'])
>```

>[!tip]- Pie Charts
>```python
>fig = px.pie(labels=df.index,
>             values=df.values,
>             names=df.index,
>             title="Figure Title",
>             hole=0.5
>             )
> fig.update_traces(textposition='outside', textinfo='percent+label')
> fig.show()
>```

>[!tip]- Converting datatypes
>```python
># originally a column with datatype=object
>df.col = df.col.astype(str).str.replace('problem_char', '') 
>df.col = pd.to_numeric(df.col)
>```

>[!tip]- Multiplying Columns
>```python
>df['new_col'] = df.col1.mul(df.col2)
>```

>[!tip]- Scatter Plots
>```python
>scatter = px.scatter(merged_df,
>	x="App",
>	y="Installs",
>	title="Category Concentration",
>	size="App", # changes the size of the plot point according to value
>	hover_name=merged_df.index,
>	color="Installs" # adds a color key
>	)
>scatter.update_layout(xaxis_title="Number of Apps (Lower=More Concentrated)",
>	yaxis=dict(type='log'))

>[!tip]- Adding Colour Scales
>```python
>chart = px.bar(x=df.index,
>		y= df.values,
>		color=df.values, # choose which values to use to determine colours
>		color_continuous_scale="Agsunset" # choose a premade colour scale
>		)
>chart.updated_layout(coloraxis_showscale=False) # hide the colour scale legend
>```

>[!success] You can find a full list of plotly colour scales [here](https://plotly.com/python/builtin-colorscales/).

>[!tip]- Grouped Charts 
>>```python
>df_grouped = df.groupby(['col1', 'col2'], asindex=False).agg[{'value_col': pd.Series.count}]
>```

>[!tip]- Box Plots
>```python
>box = px.box(df,
> 	y='col1',
> 	x='col2',
> 	color='col2',
> 	notched=True,
> 	points='all')
> 	
> box.update_layout(yaxis=dict(type='log'))> box.show()
>
># another example
>box = px.box(df_paid_apps,
> 	x='Category',
> 	y="Price",
> 	title='Price per Category')
> box.update_layout(xaxis_title='Category',
> 	yaxis_title='Paid App Price',
> 	xaxis={'categoryorder':'max descending'}, # sort categories
> 	yaxis=dict(type='log'))
>```

# Packages
```python
import pandas as pd
import plotly.express as px
```

> [!tip]+ Packages
> - [[Pandas]]
> - [[Plotly]]

<hr />

```dataviewjs
dv.view("customJS/navPY")
```

