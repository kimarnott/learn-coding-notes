---
tags:
  - day
  - python
order: 75
aliases:
  - 75. Resampling and Visualising Time Series
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio


# General
What can the popularity of search terms tell us about the world? Google Trends gives us access to the popularity of Google Search terms. Let's investigate:
- How search volume for "Bitcoin" relates to the price of Bitcoin    
- How search volume for a hot stock like Tesla relates to that stock's price and    
- How searches for "Unemployment Benefits" vary with the actual unemployment rate in the United States

>[!success]+ Learning Points & Summary
>
>In this lesson we looked at how to:
> - How to use `.describe()` to quickly see some descriptive statistics at a glance.    
> - How to use `.resample()` to make a time-series data comparable to another by changing the periodicity.    
> - How to work with `matplotlib.dates` Locators to better style a timeline (e.g., an axis on a chart).    
> - How to find the number of NaN values with `.isna().values.sum()`    
> - How to change the resolution of a chart using the figure's `dpi`    
> - How to create dashed `'--'` and dotted `'-.'` lines using `linestyles`    
> - How to use different kinds of markers (e.g., `'o'` or `'^'`) on charts.    
> - Fine-tuning the styling of Matplotlib charts by using limits, labels, `linewidth` and colours (both in the form of named colours and HEX codes).    
> - Using `.grid()` to help visually identify seasonality in a time series.

## Even more Pandas!
>[!tip]- `df.describe()` 
>Returns: count, mean, std, min 25%, 50%, 75%, max for all columns

>[!tip] `df.resample()`
>Docs: [`.resample()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.resample.html)
>Resample on some range e.g: 'ME' (month), 'Y' (year), 'T' (minute)
> ```python
> df_montly = df.resample('ME', on='date_col').last()
> ```
> You choose where you want to take data from (last(), mean() etc)


# Packages
```python
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
```


> [!tip]+ Packages
> - [[Pandas]]
> - [[Matplotlib]]


# Requirements and Solutions
```python
plt.figure(figsize=(14,8), dpi=120)
plt.xticks(fontsize=14, rotation=45)
plt.yticks(fontsize=14)
plt.title('Tesla Web Search vs Price', fontsize=18)
  
ax1 = plt.gca()
ax2 = ax1.twinx()

#Tesla stock vs web search graph
ax1.set_xlabel('Date')
ax1.set_ylabel('TSLA Stock Price', color="#E6232E", fontsize=14)
ax2.set_ylabel('Search Trend', color='skyblue', fontsize=14)
  
ax1.set_xlim([df_tesla.MONTH.min(), df_tesla.MONTH.max()])
ax1.set_ylim([0, 600])
print(type(df_tesla.MONTH.min()))
  
ax1.plot(df_tesla.MONTH, df_tesla['TSLA_USD_CLOSE'], label="TSLA Stock Price", color="#E6232E", linewidth=3)
ax2.plot(df_tesla.MONTH, df_tesla['TSLA_WEB_SEARCH'], label="Search Trend", color='skyblue', linewidth=3)

#describe the ticks we want on the axis
years = mdates.YearLocator()
months = mdates.MonthLocator()
years_fmt = mdates.DateFormatter('%Y')

#add ticks to axis
ax1.xaxis.set_major_locator(years)
ax1.xaxis.set_major_formatter(years_fmt)
ax1.xaxis.set_minor_locator(months)
  
plt.show()

#Bitcoin
plt.figure(figsize=(14,8), dpi=120)
plt.xticks(fontsize=14, rotation=45)
plt.yticks(fontsize=14)
plt.title('Bitcoin News Search vs Resampled Price', fontsize=18)
  
ax1 = plt.gca()
ax2 = ax1.twinx()
  
ax1.set_xlabel('Date')
ax1.set_ylabel('BTC Price', color="#E6232E", fontsize=14)
ax2.set_ylabel('Search Trend', color='skyblue', fontsize=14)
 
ax1.set_xlim([df_btc_monthly.index.min(), df_btc_monthly.index.max()])
ax1.set_ylim([0, 1500])
  
ax1.plot(df_btc_monthly.index, df_btc_monthly.CLOSE, label="BTC Price", olor="#E6232E", linewidth=3, linestyle='--')
ax2.plot(df_btc_monthly.index, df_btc_search.BTC_NEWS_SEARCH, label="Search Trend", color='skyblue', linewidth=3, marker='o')
  
years = mdates.YearLocator()
months = mdates.MonthLocator()
years_fmt = mdates.DateFormatter('%Y')
  
ax1.xaxis.set_major_locator(years)
ax1.xaxis.set_major_formatter(years_fmt)
ax1.xaxis.set_minor_locator(months)
  
plt.show()
```

<hr />

```dataviewjs
dv.view("customJS/navPY")
```

