---
tags:
  - day
  - python
order: 79
aliases:
  - 79. Analysing the Nobel Prize
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio


# General
This project will bring a lot of the tools and techniques that we've covered previously together. While we will review many concepts that we've covered in the previous days, you'll also learn a lot of new things.
  
**Today you'll learn:**
- Create a Choropleth to display data on a map.    
- Create bar charts showing different segments of the data with plotly.    
- Create Sunburst charts with plotly.    
- Use Seaborn's `.lmplot()` and show best-fit lines across multiple categories using the `row`, `hue`, and `lowess` parameters.    
- Understand how a different picture emerges when looking at the same data in different ways (e.g., box plots vs a time series analysis).    
- See the distribution of our data and visualise descriptive statistics with the help of a histogram in Seaborn.

>[!success]+ Learning Points & Summary
>In this lesson, we reviewed many concepts that we've covered previously, including:
>- How to uncover and investigate NaN values.
>- How to convert objects and string data types to numbers.
>- Creating donut and bar charts with plotly.
>- Create a rolling average to smooth out time-series data and show a trend.
>- How to use `.value_counts()`, `.groupby()`, `.merge()`, `.sort_values()` and `.agg()`.
>
>In addition, we learned many new things too. We looked at how to:
>- Create a Choropleth to display data on a map.
>- Create bar charts showing different segments of the data with plotly.
>- Create Sunburst charts with plotly.
>- Use Seaborn's `.lmplot()` and show best-fit lines across multiple categories using the `row`, `hue`, and `lowess` parameters.
>- Understand how a different picture emerges when looking at the same data in different ways (e.g., box plots vs a time series analysis).
>- See the distribution of our data and visualise descriptive statistics with the help of a histogram in Seaborn.

## General Data Science
A big part of data science is coming up with questions that you'd like to explore. This is the most difficult aspect to teach in a tutorial because it's completely open-ended and requires some creativity. Often times you will be asking questions of the data, that it actually cannot answer - and that's ok. That's all part of the process of discovery.

>[!tip]- Men vs Women
>Create a [donut chart using plotly](https://plotly.com/python/pie-charts/) which shows how many prizes went to men compared to how many prizes went to women. What percentage of all the prizes went to women?
>```python
>biology = df_data.sex.value_counts()
>fig = px.pie(labels=biology.index,
>             values=biology.values,
>             title="Percentage of Male vs. Female Winners",
>             names=biology.index,
>             hole=0.4,)
>  
>fig.update_traces(textposition='inside', textfont_size=15, textinfo='percent')
>  
>fig.show()
>```
>![[Day 79 - % of male vs female winners.png]]

>[!tip]- First 3 female Nobel Laureates
>- What are the names of the first 3 female Nobel laureates?
>- What did the win the prize for?
>- What do you see in their `birth_country`? Were they part of an organisation?
>```python
>df_data[df_data.sex == 'Female'].sort_values('year', ascending=True)[:3]
>```

>[!tip]- Multiple Winners
>Did some people get a Nobel Prize more than once? If so, who were they?
>```python
>is_winner = df_data.duplicated(subset=['full_name'], keep=False)
> multiple_winners = df_data[is_winner]
> print(f'There are {multiple_winners.full_name.nunique()}' \
>       ' winners who weere awarded the prize more than once.')
> 
> # alternatively, you can do this:
> multiple_winners = df_data.groupby(by = 'full_name').filter(lambda x : x['year'].count() >= 2)
> 
># then we check the results:
>col_subset = ['year', 'category', 'laureate_type', 'full_name']
> multiple_winners[col_subset]
>```

>[!tip]- Prize Categories
>- In how many categories are prizes awarded?
>- Create a plotly bar chart with the number of prizes awarded by category.
>- Use the color scale called `Aggrnyl` to colour the chart, but don't show a color axis.
>- Which category has the most number of prizes awarded?
>- Which category has the fewest number of prizes awarded?
>```python
> # Number of different categories
> df_data.category.nunique()
> 
> prizes_per_category = df_data.category.value_counts()
> v_bar = px.bar(
>         x = prizes_per_category.index,
>         y = prizes_per_category.values,
>         color = prizes_per_category.values,
>         color_continuous_scale='Aggrnyl',
>         title='Number of Prizes Awarded per Category')
>   
> v_bar.update_layout(xaxis_title='Nobel Prize Category',
>                     coloraxis_showscale=False,
>                     yaxis_title='Number of Prizes')
> v_bar.show()
>```
>![[Day 79 - Number of Prizes per Category.png]]

>[!tip]-  First Economics Prize
>- When was the first prize in the field of Economics awarded? 
>- Who did the prize go to?
>```python
>df_data[df_data.category == 'Economics'].sort_values('year')[:3]
>```

>[!tip]- Men and Women by Category
>Create a [plotly bar chart](https://plotly.com/python/bar-charts/) that shows the split between men and women by category.
>- Hover over the bar chart. How many prizes went to women in Literature compared to Physics?
>```python
>cat_men_women = df_data.groupby(['category', 'sex'],
>                                as_index=False).agg({'prize': pd.Series.count})
> cat_men_women.sort_values('prize', ascending=False, inplace=True)
> cat_men_women
> 
> v_bar_split = px.bar(x = cat_men_women.category,
>                      y = cat_men_women.prize,
>                      color = cat_men_women.sex,
>                      title='Number of Prizes Awarded per Category split by Men and Women')
>   
> v_bar_split.update_layout(xaxis_title='Nobel Prize Category',
>                           yaxis_title='Number of Prizes')
> v_bar_split.show()
>```
>![[Day 79 - Prizes per category, men vs women.png]]

## Matplotlib - Trends over Time

>[!tip]- Trends in number of awards
>Are more prizes awarded recently than when the prize was first created? Show the trend in awards visually.
>- Count the number of prizes awarded every year.
>- Create a 5 year rolling average of the number of prizes (Hint: see previous lessons analysing Google Trends).
>- Using Matplotlib superimpose the rolling average on a scatter plot.
>- Show a tick mark on the x-axis for every 5 years from 1900 to 2020. (Hint: you'll need to use NumPy).
>- Use the [named colours](https://matplotlib.org/3.1.0/gallery/color/named_colors.html) to draw the data points in `dogerblue` while the rolling average is coloured in `crimson`.
>- Looking at the chart, did the first and second world wars have an impact on the number of prizes being given out?
>- What could be the reason for the trend in the chart?
>```python
># count number of prizes awarded each year:
>prize_per_year = df_data.groupby(by='year').count().prize
>
># 5 year moving average
>moving_average = prize_per_year.rolling(window=5).mean()
> 
> plt.figure(figsize=(16,8), dpi=200)
> plt.title('Number of Nobel Prizes Awarded per Year', fontsize=18)
> plt.yticks(fontsize=14)
> plt.xticks(ticks=np.arange(1900, 2021, step=5),
>            fontsize=14,
>            rotation=45)
>   
> ax = plt.gca()
> ax.set_xlim(1900, 2020)
>   
> ax.scatter(x=prize_per_year.index,
>            y=prize_per_year.values,
>            c='dodgerblue',
>            alpha=0.7,
>            s=100,)
>   
> ax.plot(prize_per_year.index,
>         moving_average.values,
>         c='crimson',
>         linewidth=3,)
>   
> plt.show()
>```
>![[Da 79 - Prizes over Time.png]]

>[!tip]- Investigate if more prizes are shared than before.
>- Calculate the average prize share of the winners on a year by year basis.
>- Calculate the 5 year rolling average of the percentage share.
>- Copy-paste the cell from the chart you created above.
>- Modify the code to add a secondary axis to your Matplotlib chart.
>- Plot the rolling average of the prize share on this chart.
>- See if you can invert the secondary y-axis to make the relationship even more clear.
>```python
> # work out rolling average of % share of the prize
> yearly_avg_share = df_data.groupby(by='year').agg({'share_pct': pd.Series.mean})
> share_moving_average = yearly_avg_share.rolling(window=5).mean()
> plt.figure(figsize=(16,8), dpi=200)
> plt.title('Number of Nobel Prizes Awarded per Year', fontsize=18)
> plt.yticks(fontsize=14)
> plt.xticks(ticks=np.arange(1900, 2021, step=5),
>            fontsize=14,
>            rotation=45)
>   
> ax1 = plt.gca()
> ax2 = ax1.twinx()
> ax1.set_xlim(1900, 2020)
>   
> # As the prize share should be inverse to the number of prizes awarded (each person gets a smaller share as the number of people increase), we invert the prize share axis
> ax2.invert_yaxis()
>   
> ax1.scatter(x=prize_per_year.index,
>            y=prize_per_year.values,
>            c='dodgerblue',
>            alpha=0.7,
>            s=100,)
>   
> ax1.plot(prize_per_year.index,
>         moving_average.values,
>         c='crimson',
>         linewidth=3,)
>  
> ax2.plot(prize_per_year.index,
>         share_moving_average.values,
>         c='grey',
>         linewidth=3,)
>   
> plt.show()
>```
>![[Day 79 - Prizes and Shares per Year.png]]

# Choropleth Map and the Countries with the Most Prizes

For this next bit, we're going to compare which countries actually get the most prizes. And we're also going to look at in which categories those prizes are awarded.

>[!tip]- Top 20 Country Ranking
>- Create a Pandas DataFrame called `top20_countries` that has the two columns. The `prize` column should contain the total number of prizes won.
>- Is it best to use `birth_country`, `birth_country_current` or `organization_country`?
>- What are some potential problems when using `birth_country` or any of the others? Which column is the least problematic?
>- Then use plotly to create a horizontal bar chart showing the number of prizes won by each country.
>- What is the ranking for the top 20 countries in terms of the number of prizes?
>```python
># as some countries may no longer exist, we use the 'current' birth country
> top_countries = df_data.groupby(['birth_country_current'],
>                                   as_index=False).agg({'prize': pd.Series.count})
>   
> top_countries.sort_values(by='prize', inplace=True)
> top20_countries = top_countries[-20:]
> top20_countries
> 
> h_bar = px.bar(x=top20_countries.prize,
>                y=top20_countries.birth_country_current,
>                orientation='h',
>                color=top20_countries.prize,
>                color_continuous_scale='Viridis',
>                title='Top 20 Countries by Number of Prizes')
>   
> h_bar.update_layout(xaxis_title='Number of Prizes',
>                     yaxis_title='Country',
>                     coloraxis_showscale=False)
> h_bar.show()
>```
>![[Day 79 - Top 20 Countries.png]]

>[!tip]- Choropleth Map
>- Create a choropleth map using [the plotly documentation](https://plotly.com/python/choropleth-maps/)
>- Experiment with [plotly's available colours](https://plotly.com/python/builtin-colorscales/). I quite like the sequential colour `matter` on this map.
>- Hint: You'll need to use a 3 letter country code for each country.
>```python
> df_countries = df_data.groupby(['birth_country_current', 'ISO'],
>                                as_index=False).agg({'prize': pd.Series.count})
> df_countries.sort_values('prize', ascending=False)
> 
> world_map = px.choropleth(df_countries,
>                           locations='ISO',
>                           color='prize',
>                           hover_name='birth_country_current',
>                           color_continuous_scale=px.colors.sequential.matter)
>   
> world_map.update_layout(coloraxis_showscale=True,)
>   
> world_map.show()
>```
>![[Day 79 - Map.png]]
>>[!note] Plotly lets you zoom in and pan on maps!

>[!tip]- Country Bar Chart with Prize Category
>- See if you can divide up the plotly bar chart you created above to show the which categories made up the total number of prizes.
>- In which category are Germany and Japan the weakest compared to the United States?
>- In which category does Germany have more prizes than the UK?
>- In which categories does France have more prizes than Germany?
>- Which category makes up most of Australia's Nobel prizes?
>- Which category makes up half of the prizes in the Netherlands?
>- Does the United States have more prizes in Economics than all of France? What about in Physics or Medicine?
>- The hard part is preparing the data for this chart!
>>Hint: Take a two-step approach. The first step is grouping the data by country and category.
>```python
> cat_country = df_data.groupby(['birth_country_current', 'category'],
>                                as_index=False).agg({'prize': pd.Series.count})
> cat_country.sort_values(by='prize', ascending=False, inplace=True)
> cat_country
> 
> merged_df = pd.merge(cat_country, top20_countries, on='birth_country_current')
> # change column names
> merged_df.columns = ['birth_country_current', 'category', 'cat_prize', 'total_prize']
> merged_df.sort_values(by='total_prize', inplace=True)
> 
> cat_cntry_bar = px.bar(x=merged_df.cat_prize,
>                        y=merged_df.birth_country_current,
>                        color=merged_df.category,
>                        orientation='h',
>                        title='Top 20 Countries by Number of Prizes and Category')
>   
> cat_cntry_bar.update_layout(xaxis_title='Number of Prizes',
>                             yaxis_title='Country')
> cat_cntry_bar.show()
>```
>![[Day 79 - Top 20 countries by prizes and category.png]]

>[!tip]- Prizes by Country over Time
>Every country's fortunes wax and wane over time. Investigate how the total number of prizes awarded changed over the years.
>- When did the United States eclipse every other country in terms of the number of prizes won?
>- Which country or countries were leading previously?
>- Calculate the cumulative number of prizes won by each country in every year. Again, use the `birth_country_current` of the winner to calculate this.
>- Create a [plotly line chart](https://plotly.com/python/line-charts/) where each country is a coloured line.
>```python
># prizes by country by year
> prize_by_year = df_data.groupby(by=['birth_country_current', 'year'], as_index=False).count()
> prize_by_year = prize_by_year.sort_values('year')[['year', 'birth_country_current', 'prize']]
> 
> cumulative_prizes = prize_by_year.groupby(by=['birth_country_current',
>                                               'year']).sum().groupby(level=[0]).cumsum()
> cumulative_prizes.reset_index(inplace=True)
> 
> l_chart = px.line(cumulative_prizes,
>                   x='year',
>                   y='prize',
>                   color='birth_country_current',
>                   hover_name='birth_country_current')
>   
> l_chart.update_layout(xaxis_title='Year',
>                       yaxis_title='Number of Prizes')
>   
> l_chart.show()
>```
>![[Day 79 - Prizes by Country Over Time.png]]

## Detailed Regional Breakdown of Research Location (Sunburst)

>[!tip]- Organisations affiliated with Nobel Laureates
> Many Nobel laureates are affiliated with a university, a laboratory, or a research organisation (apart from Literature and Peace prize winners as we've seen). But the world is a big place. Which research institutions had the most Nobel laureates working there at the time of making the discovery?
> - Which organisations make up the top 20?
> - How many Nobel prize winners are affiliated with the University of Chicago and Harvard University?
> ```python
> top20_orgs = df_data.organization_name.value_counts()[:20]
> top20_orgs.sort_values(ascending=True, inplace=True)
> org_bar = px.bar(x = top20_orgs.values,
>                  y = top20_orgs.index,
>                  orientation='h',
>                  color=top20_orgs.values,
>                  color_continuous_scale=px.colors.sequential.haline,
>                  title='Top 20 Research Institutions by Number of Prizes')
>   
> org_bar.update_layout(xaxis_title='Number of Prizes',
>                       yaxis_title='Institution',
>                       coloraxis_showscale=False)
> org_bar.show()
> ```
> ![[Day 79 - Institutions.png]]

>[!tip]- Cities
>Each research organisation is located in a particular city. Are some cities hot spots for scientific discoveries? Where do major discoveries tend to take place?
>- Create another plotly bar chart graphing the top 20 organisation cities of the research institutions associated with a Nobel laureate.
>- Where is the number one hotspot for discoveries in the world?
>- Which city in Europe has had the most discoveries?
>```python
> top20_org_cities = df_data.organization_city.value_counts()[:20]
> top20_org_cities.sort_values(ascending=True, inplace=True)
> city_bar2 = px.bar(x = top20_org_cities.values,
>                   y = top20_org_cities.index,
>                   orientation='h',
>                   color=top20_org_cities.values,
>                   color_continuous_scale=px.colors.sequential.Plasma,
>                   title='Which Cities Do the Most Research?')
>   
> city_bar2.update_layout(xaxis_title='Number of Prizes',
>                        yaxis_title='City',
>                        coloraxis_showscale=False)
> city_bar2.show()
>```
>![[Day 79 - Cities and Research.png]]

>[!tip]- Where are Nobel Laureates Born? Chart the Laureate Birth Cities
>- Create a plotly bar chart graphing the top 20 birth cities of Nobel laureates.
>- Use a named colour scale called `Plasma` for the chart.
>- What percentage of the United States prizes came from Nobel laureates born in New York?
>- How many Nobel laureates were born in London, Paris and Vienna?
>- Out of the top 5 cities, how many are in the United States?
>```python
> top20_cities = df_data.birth_city.value_counts()[:20]
> top20_cities.sort_values(ascending=True, inplace=True)
> city_bar = px.bar(x=top20_cities.values,
>                   y=top20_cities.index,
>                   orientation='h',
>                   color=top20_cities.values,
>                   color_continuous_scale=px.colors.sequential.Plasma,
>                   title='Where were the Nobel Laureates Born?')
>   
> city_bar.update_layout(xaxis_title='Number of Prizes',
>                        yaxis_title='City of Birth',
>                        coloraxis_showscale=False)
> city_bar.show()
>```
>![[Day 79 - Where born.png]]

>[!tip]- Plotly Sunburst (Country, City, and Organisation)
>```python
> country_city_org = df_data.groupby(by=['organization_country',
>                                        'organization_city',
>                                        'organization_name'], as_index=False).agg({'prize': pd.Series.count})
>   
> country_city_org = country_city_org.sort_values('prize', ascending=False)
> country_city_org
> 
> burst = px.sunburst(country_city_org,
>                     path=['organization_country', 'organization_city', 'organization_name'],
>                     values='prize',
>                     title='Where do Discoveries Take Place?',
>                    )
>   
> burst.update_layout(xaxis_title='Number of Prizes',
>                     yaxis_title='City',
>                     coloraxis_showscale=False)
>   
> burst.show()
>```
>![[Day 79 - Sunburst.png]]

## Unearthing Patterns in the Laureate Age at the Time of the Award

>[!tip]- Winner Ages
>Calculate the age of the laureate in the year of the ceremony and add this as a column called `winning_age` to the `df_data` DataFrame. Hint: you can use [this](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.dt.html) to help you.
>```python
> birth_years = df_data.birth_date.dt.year
> df_data['winning_age'] = df_data.year - birth_years
>```

>[!tip]- Who were the oldest and the youngest winners?
>- What are the names of the youngest and oldest Nobel laureate?
>- What did they win the prize for?
>- What is the average age of a winner?
>- 75% of laureates are younger than what age when they receive the prize?
>- Use Seaborn to [create histogram](https://seaborn.pydata.org/generated/seaborn.histplot.html) to visualise the distribution of laureate age at the time of winning. Experiment with the number of `bins` to see how the visualisation changes.
>```python
> display(df_data.nlargest(n=1, columns='winning_age')) # picks out row for oldest
> display(df_data.nsmallest(n=1, columns='winning_age')) # picks out row for youngest
> df_data.winning_age.describe() # gets general info
>```
>![[Day 79 - Winner Age.png]]

>[!tip]- Descriptive Statistics and Histogram
>- Calculate the descriptive statistics for the age at the time of the award.
>- Then visualise the distribution in the form of a histogram using [Seaborn's .histplot() function](https://seaborn.pydata.org/generated/seaborn.histplot.html).
>- Experiment with the `bin` size. Try 10, 20, 30, and 50.
>```python
> plt.figure(figsize=(8, 4), dpi=200)
> sns.histplot(data=df_data,
>              x=df_data.winning_age,
>              bins=30)
> plt.xlabel('Age')
> plt.title('Distribution of Age on Receipt of Prize')
> plt.show()
>```

>[!tip]- Age over Time
>Are Nobel laureates being nominated later in life than before? Have the ages of laureates at the time of the award increased or decreased over time?
>- Use Seaborn to [create a .regplot](https://seaborn.pydata.org/generated/seaborn.regplot.html?highlight=regplot#seaborn.regplot) with a trendline.
>- Set the `lowess` parameter to `True` to show a moving average of the linear fit.
>- According to the best fit line, how old were Nobel laureates in the years 1900-1940 when they were awarded the prize?
>- According to the best fit line, what age would it predict for a Nobel laureate in 2020?
>```python
> plt.figure(figsize=(8,4), dpi=200)
> with sns.axes_style("whitegrid"):
>     sns.regplot(data=df_data,
>                 x='year',
>                 y='winning_age',
>                 lowess=True,
>                 scatter_kws = {'alpha': 0.4},
>                 line_kws={'color': 'black'})
>   
> plt.show()
>```
>![[Day 79 - Age over Time.png]]
>Using the lowess parameter allows us to plot a local linear regression. This means the best fit line is still linear, but it's more like a moving average which gives us a non-linear shape across the entire series. This is super neat because it clearly shows how the Nobel laureates are getting their award later and later in life. From 1900 to around 1950, the laureates were around 55 years old, but these days they are closer to 70 years old when they get their award!

>[!tip]- Age by Category
>How does the age of laureates vary by category?
>- Use Seaborn's [`.boxplot()`](https://seaborn.pydata.org/generated/seaborn.boxplot.html?highlight=boxplot#seaborn.boxplot) to show how the mean, quartiles, max, and minimum values vary across categories. Which category has the longest "whiskers"?
>- In which prize category are the average winners the oldest?
>- In which prize category are the average winners the youngest?
>- You can also use plotly to create the box plot if you like.
> ```python
> box = px.box(df_data,
>              x='category',
>              y='winning_age',
>              title='How old are the Winners?')
> 
> box.update_layout(xaxis_title='Category',
>                   yaxis_title='Age at time of Award',
>                   xaxis={'categoryorder':'mean ascending'},)
> 
> box.show()
>```
>![[Day 79 - Boxplot Age by Category.png]]

>[!tip]- Age over Time by Category
>- Now use Seaborn's [`.lmplot()`](https://seaborn.pydata.org/generated/seaborn.lmplot.html?highlight=lmplot#seaborn.lmplot) and the `row` parameter to create 6 separate charts for each prize category. Again set `lowess` to `True`.
>- What are the winning age trends in each category?
>- Which category has the age trending up and which category has the age trending down?
>- Is this `.lmplot()` telling a different story from the `.boxplot()`?
>- Create a third chart with Seaborn. This time use `.lmplot()` to put all 6 categories on the same chart using the `hue` parameter.
>```python
> with sns.axes_style('whitegrid'):
>     sns.lmplot(data=df_data,
>                x='year',
>                y='winning_age',
>                # row = 'category' # generates multiple charts (one for each category)
>                hue = 'category',  # plots all datasets on one chart
>                lowess=True,
>                aspect=2,
>                scatter_kws = {'alpha': 0.6},
>                line_kws = {'color': 'black'},)
>   
> plt.show()
>```
>![[Day 79 - Age over Time by Category.png]]

# Packages
```python
import pandas as pd
import numpy as np
import plotly.express as px
import seaborn as sns
import matplotlib.pyplot as plt
```


> [!tip]+ Packages
> - [[Pandas]]
> - [[Numpy]]
> - [[Plotly]]
> - [[Seaborn]]
> - [[Matplotlib]]

<hr />

```dataviewjs
dv.view("customJS/navPY")
```

