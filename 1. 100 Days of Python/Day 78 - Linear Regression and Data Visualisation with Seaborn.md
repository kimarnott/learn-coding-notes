---
tags:
  - day
  - python
order: 78
aliases:
  - 78. Linear Regression and Seaborn
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio


# General

**Today you'll learn:**
- How to use a popular data visualisation library called Seaborn    
- How to run and interpret a linear regression with scikit-learn    
- How to plot a regression a scatter plot to visualise relationships in the data    
- How to add a third dimension to a scatter plot to create a bubble chart    
- How to cleverly use floor division `//` to convert your data

>[!success]+ Learning Points & Summary
>Today was a pretty packed lesson where we introduced a lot of new concepts. In this lesson we looked at how to:
>- Use nested loops to remove unwanted characters from multiple columns
>- Filter Pandas DataFrames based on multiple conditions using both `.loc[]` and `.query()`
>- Create bubble charts using the Seaborn Library
>- Style Seaborn charts using the pre-built styles and by modifying Matplotlib parameters
>- Use floor division (i.e., integer division) to convert years to decades
>- Use Seaborn to superimpose a linear regressions over our data
>- Make a judgement if our regression is good or bad based on how well the model fits our data and the r-squared metric

## More Pandas & Seaborn

>[!tip]- Converting String to Numeric (multiple problem chars and columns)
>
>```python
>chars_to_remove = [',', '$']
>columns_to_clean = ['USD_Production_Budget',
>                    'USD_Worldwide_Gross',
>                    'USD_Domestic_Gross']
>  
>for col in columns_to_clean:
>    for char in chars_to_remove:
>        # Replace each character with an empty string
>        data[col] = data[col].astype(str).str.replace(char, "")
>    # Convert column to a numeric data type
>    data[col] = pd.to_numeric(data[col])
>```

>[!tip]- Filtering on Multiple Conditions
>One approach is to use `.loc[]` property with the bitwise `&` operator. But you could also use the `.query()` function.
>```python
>filtered_data = data.loc[(data.col1 == 0) &
>                          (data.col2 != 0)]
># or
>filtered_data = data.query('col1 == 0 and col2 != 0')
>```

>[!tip]- Seaborn Scatter/Bubble Plots
>To create a [.scatterplot()](https://seaborn.pydata.org/generated/seaborn.scatterplot.html?highlight=scatterplot#seaborn.scatterplot), all we need to do is supply our DataFrame and the column names that we'd like to see on our axes.
>
>Because Seaborn is built on top of Matplotlib, we can dive into the Matplotlib layer anytime to configure our chart.
>
>To set the styling on a single chart (as opposed to all the charts in the entire notebook) we can use Python's `with` keyword.
>```python
>plt.figure(figsize=(8,4), dpi=200)
>
># set styling on a single chart
>with sns.axes_style('darkgrid'): # there are more built-in themes
>  ax = sns.scatterplot(data=data_clean,
>                       x='USD_Production_Budget',
>                       y='USD_Worldwide_Gross',
>                       hue='USD_Worldwide_Gross', # change colour
>                       size='US_Worldwide_Gross) # change size of dot
>  
>  ax.set(ylim=(0, 3000000000),
>         xlim=(0, 450000000),
>         ylabel='Revenue in $ billions',
>         xlabel='Budget in $100 millions')
>  
>plt.show()
>```

>[!tip]- Seaborn Linear Regression Plots
> The `.regplot()` creates a scatterplot and draws a linear regression line together with the confidence interval at the same time.
> To style the chart further, we can once again drop into the Matplotlib layer and supply keyword arguments as dictionaries.
> ```python
> plt.figure(figsize=(8,4), dpi=200)
> with sns.axes_style('darkgrid'):
>   ax = sns.regplot(data=new_films,
>                    x='USD_Production_Budget',
>                    y='USD_Worldwide_Gross',
>                    color='#2f4b7c',
>                    scatter_kws = {'alpha': 0.3},
>                    line_kws = {'color': '#ff7c43'})
>   ax.set(ylim=(0, 3000000000),
>          xlim=(0, 450000000),
>          ylabel='Revenue in $ billions',
>          xlabel='Budget in $100 millions')
> ```
> ![[Seaborn Linear Regression Plot.png]]

## Data Science Stuff (scikit-learn)

Let's dive into our linear regression model a bit more. We are using a **univariate** regression. This is a regression with a single **explanatory variable** (our movie BUDGET). Explanatory variables are also referred to as **features** in machine learning terminology. You will often see the features named capital `X` and the target named lower case `y`

Using our data on budgets, the linear regression estimates the best possible line to fit our movie revenues. The regression line has the following structure:

$$
REVENUE=θ_0+θ_1BUDGET
$$

To find the best possible line, our regression will estimate the y-intercept ("theta zero") and the slope ("theta one"). The line's **intercept** on the y-axis tells us how much revenue a movie would make if the budget was 0. The **slope** tells us how much extra revenue we get for a $1 increase in the movie budget.

![](https://img-c.udemycdn.com/redactor/raw/2020-10-16_15-31-02-3bdbeb669ce3d7ecebe72abb986e8d35.png)

>[!tip]- `LinearRegression`
>```python
>regression = LinearRegression() # create regression object
>```
>LinearRegression does not like receiving Pandas Series, so create some new DataFrames:
>```python
>## 
># Explanatory Variable(s) or Feature(s)
>X = pd.DataFrame(new_films, columns=['USD_Production_Budget'])
>
># Response Variable or Target
>y = pd.DataFrame(new_films, columns=['USD_Worldwide_Gross])
>```
>Both `intercept_` and `coef_` are simply [attributes of the LinearRegression object](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html). Don't worry about the underscores at the end, these are simply part of the attribute names that the scikit-learn developers have chosen.
>```python
># Find the best-fit line
>regression.fit(X, y)
>
> # Theta zero
>regression.intercept_ # array([-8650768.00661027])
>
># Theta one
>regression.coef_ # array([[3.12259592]])
>```
>### R-Sqaured: Goodness of Fit
>One measure of figuring out how well our model fits our data is by looking at a metric called r-squared. This is a good number to look at in addition to eyeballing our charts. It indicates how much variance there is in whatever value we're looking at, i.e. how well the model can explain what is actually happening.
>```python
>#R-squared
>regression.score(X, y) # 0.5577032617720403
>
>print(f'The slope coefficient is: {regression.coef_[0]}')
>print(f'The intercept is: {regression.intercept_[0]}')
>print(f'The r-squared is: {regression.score(X, y)}')
>```
>Doing this, we have estimated the slope and intercept, lets try getting an estimate for a budget of $350 million
>```python
>budget = 350000000
>revenue_estimate = regression.intercept_[0] + regression.coef_[0,0]*budget
>revenue_estimate = round(revenue_estimate, -6)
>```

# Packages
```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
```


> [!tip]+ Packages
> - [[Pandas]]
> - [[Matplotlib]]
> - [[Seaborn]]
> - [[scikit-learn]]


<hr />

```dataviewjs
dv.view("customJS/navPY")
```

