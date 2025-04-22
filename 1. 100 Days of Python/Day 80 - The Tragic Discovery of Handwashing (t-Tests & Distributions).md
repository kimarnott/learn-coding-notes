---
tags:
  - day
  - python
order: 80
aliases:
  - 80. t-Tests & Distributions
complete: true
---
- [x] Concept
- [ ] Capstone
- [ ] Portfolio


# General
Today you will become a doctor, but not just any doctor. You will become Dr Ignaz Semmelweis, a Hungarian physician born in 1818 who worked in the Vienna General Hospital.

In the past, people didn't know about bacteria, germs, or viruses. People illness was caused by "bad air" or evil spirits. But in the 1800s Doctors started looking more at anatomy, doing autopsies and making arguments based on data. Dr Semmelweis suspected that something was going wrong with the procedures at Vienna General Hospital. Dr Semmelweis wanted to figure out why so many women in maternity wards were dying from childbed fever (i.e., [puerperal fever](https://en.wikipedia.org/wiki/Postpartum_infections)).

**Today you'll learn:**
- How to make a compelling argument using data
- How to superimpose histograms to show differences in distributions
- How to use a Kernel Density Estimate (KDE) to show a graphic estimate of a distribution.    
- How to use scipy and test for statistical significance by looking at p-values.    
- How to highlight different parts of a time series chart in Matplotib.    
- How to add and configure a Legend in Matplotlib.    
- Use NumPy's `.where()` function to process elements depending on a condition.

>[!success]+ Learning Points & Summary
> - How to use histograms to visualise distributions    
> - How to superimpose histograms on top of each other even when the data series have different lengths    
> - How to use a to smooth out kinks in a histogram and visualise a distribution with a Kernel Density Estimate (KDE)    
> - How to improve a KDE by specifying boundaries on the estimates    
> - How to use scipy and test for statistical significance by looking at p-values.    
> - How to highlight different parts of a time series chart in Matplotib.    
> - How to add and configure a Legend in Matplotlib.    
> - Use NumPy's `.where()` function to process elements depending on a condition.

## Data/Script Set-up

```python
# general presentation
pd.options.display.float_format = '{:,.2f}'.format
  
# Create locators for ticks on the time axis
years = mdates.YearLocator()
months = mdates.MonthLocator()
years_fmt = mdates.DateFormatter('%Y')
  
# Register date converters to avoid warning messages
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

df_yearly = pd.read_csv('annual_deaths_by_clinic.csv')
# parse_dates avoids DateTime conversion later
df_monthly = pd.read_csv('monthly_deaths.csv',
                      parse_dates=['date'])
```

## General Data Science

>[!tip]- Preliminary Data Exploration
>- What is the shape of `df_yearly` and `df_monthly`? How many rows and columns?
>- What are the column names?
>- Which years are included in the dataset?
>- Are there any NaN values or duplicates?
>- What were the average number of births that took place per month?
>- What were the average number of deaths that took place per month?
>
>Using `.shape`, `.head()`, `.tail()` we see that the dataset covers the years 1841 to 1849. The two tables report the total number of births and the total number of deaths. Interestingly, the yearly data breaks the number of births and deaths down by clinic.
>We see that there are no NaN values in either of the DataFrames. We can verify this either with using `.info()` or using `.isna().values.any()`.
>There are also no duplicate entries. In other words, the dataset appears to be clean, we check by using `.duplicated().values.any()`

>[!tip]- Percentage of Women Dying in Childbirth
>How dangerous was childbirth in the 1840s in Vienna?
>- Using the annual data, calculate the percentage of women giving birth who died throughout the 1840s at the hospital.
>```python
> prob = df_yearly.deaths.sum() / df_yearly.births.sum() * 100
> print(f'Chances of dying in the 1840s in Vienna: {prob:.3}%')
>```

>[!tip]- Total Births and Deaths over Time
>- Format the x-axis using locators for the years and months (Hint: we did this in the Google Trends notebook)
>- Set the range on the x-axis so that the chart lines touch the y-axes
>- Add gridlines
>- Use `skyblue` and `crimson` for the line colours
>- Use a dashed line style for the number of deaths
>- Change the line thickness to 3 and 2 for the births and deaths respectively.
>- Do you notice anything in the late 1840s?
> ```python
> plt.figure(figsize=(14,8), dpi=200)
> plt.title('Total Number of Monthly Births and Deaths', fontsize=18)
> plt.yticks(fontsize=14)
> plt.xticks(fontsize=14, rotation=45)
>   
> ax1 = plt.gca()
> ax2 = ax1.twinx()
>   
> ax1.set_ylabel('Births', color='skyblue', fontsize=18)
> ax2.set_ylabel('Deaths', color='crimson', fontsize=18)
>   
> # Add locators for tick marks
> ax1.set_xlim([df_monthly.date.min(), df_monthly.date.max()])
> ax1.xaxis.set_major_locator(years)
> ax1.xaxis.set_major_formatter(years_fmt)
> ax1.xaxis.set_minor_locator(months)
>   
> ax1.grid(color='grey', linestyle='--')
>   
> ax1.plot(df_monthly.date,
>          df_monthly.births,
>          color='skyblue',
>          linewidth=3)
>   
> ax2.plot(df_monthly.date,
>          df_monthly.deaths,
>          color='crimson',
>          linewidth=2,
>          linestyle='--')
>   
> plt.show()
> ```
> ![[Day 80 - Monthly Births and Deaths.png]]

>[!tip]- Yearly Data Split by Clinic
>Use plotly to create line charts of the births and deaths of the two different clinics at the Vienna General Hospital.
> - Which clinic is bigger or more busy judging by the number of births?
> - Has the hospital had more patients over time?
> - What was the highest number of deaths recorded in clinic 1 and clinic 2?
> ```python
> line = px.line(df_yearly,
>                x='year',
>                y='births',
>                color='clinic',
>                title='Total Yearly Births by Clinic')
> 
> line = px.line(df_yearly,
>                x='year',
>                y='deaths',
>                color='clinic',
>                title='Total Yearly Deaths by Clinic')
> ```
> ![[Day 80 - Yearly Births by Clinic.png]]
> ![[Day 80 - Yearly Deaths By Clinic.png]]

>[!tip]- Calculate the Proportion of Deaths at Each Clinic
>Calculate the proportion of maternal deaths per clinic. That way we can compare like with like.
> - Work out the percentage of deaths for each row in the `df_yearly` DataFrame by adding a column called "pct_deaths".
> - Calculate the average maternal death rate for clinic 1 and clinic 2 (i.e., the total number of deaths per the total number of births).
> - Create another plotly line chart to see how the percentage varies year over year with the two different clinics.
> - Which clinic has a higher proportion of deaths?
> - What is the highest monthly death rate in clinic 1 compared to clinic 2?
> ```python
> df_yearly['pct_deaths'] = df_yearly.deaths / df_yearly.births
> clinic_1 = df_yearly[df_yearly.clinic == 'clinic 1']
> avg_c1 = clinic_1.deaths.sum() / clinic_1.births.sum() * 100
> print(f'Average death rate in clinic 1 is {avg_c1:.3}%.')
> 
> clinic_2 = df_yearly[df_yearly.clinic == 'clinic 2']
> avg_c2 = clinic_2.deaths.sum() / clinic_2.births.sum() * 100
> print(f'Average death rate in clinic 2 is {avg_c2:.3}%.')
> 
> # plot
> line = px.line(df_yearly,
>                x='year',
>                y='pct_deaths',
>                color='clinic',
>                title='Proportion of Yearly Deaths by Clinic')
>   
> line.show()
> ```
> ![[Day 80 - Proportion of Yearly Deaths per Clinic.png]]

## The Story Continues...
At first, Dr Semmelweis thought that the position of the women giving birth was the issue. In clinic 2, the midwives' clinic, women gave birth on their sides. In the doctors' clinic, women gave birth on their backs. So, Dr. Semmelweis, had women in the doctors' clinic give birth on their sides. However, this had no effect on the death rate.

Next, Dr Semmelweis noticed that whenever someone on the ward died, a priest would walk through clinic 1, past the women's beds ringing a bell 🔔. Perhaps the priest and the bell ringing terrified the women so much after birth that they developed a fever, got sick and died. Dr Semmelweis had the priest change his route and stop ringing the bell 🔕. Again, this had no effect.

At this point, Dr Semmelweis was so frustrated he went on holiday to Venice. Perhaps a short break would clear his head. When Semmelweis returned from his vacation, he was told that one of his colleagues, a pathologist, had fallen ill and died. His friend had pricked his finger while doing an autopsy on a woman who had died from childbed fever and subsequently got very sick himself and died. 😮

Looking at the pathologist's symptoms, Semmelweis realised the pathologist died from the same thing as the women he had autopsied.  This was his breakthrough: anyone could get sick from childbed fever, not just women giving birth!

This is what led to Semmelweis' new theory. Perhaps there were little pieces or particles of a corpse that the doctors and medical students were getting on their hands while dissecting the cadavers during an autopsy. And when the doctors delivered the babies in clinic 1, these particles would get inside the women giving birth who would then develop the disease and die.

## The Effect of Handwashing

In June 1846, Dr Semmelweis ordered everyone on his medical staff to start cleaning their hands and instruments not just with soap and water but with a chlorine solution (he didn't know it at the time, but chlorine is an amazing disinfectant). The reason Dr Semmelweis actually chose the chlorine was that he wanted to get rid of any smell on doctors' hands after an autopsy. No one knew anything about bacteria, germs or viruses at the time.

>[!tip]- The Effect of Handwashing
>- Add a column called "pct_deaths" to `df_monthly` that has the percentage of deaths per birth for each row.
> - Create two subsets from the `df_monthly` data: before and after Dr Semmelweis ordered washing hand.
> - Calculate the average death rate prior to June 1947.
> - Calculate the average death rate after June 1947.
> ```python
> df_monthly['pct_deaths'] = df_monthly.deaths/df_monthly.births
> 
> # Split monthly into before and after handwashing_start
> before_washing = df_monthly[df_monthly.date < handwashing_start]
> after_washing = df_monthly[df_monthly.date >= handwashing_start]
> 
> bw_rate = before_washing.deaths.sum() / before_washing.births.sum() * 100
> aw_rate = after_washing.deaths.sum() / after_washing.births.sum() * 100
> print(f'Average death rate before 1847 was {bw_rate:.4}%')
> print(f'Average death rate AFTER 1847 was {aw_rate:.3}%')
> ```

>[!tip]- Calculate a Rolling Average of Death Rate
>Create a DataFrame that has the 6 month rolling average death rate prior to mandatory handwashing.
> _Hint_: You'll need to set the dates as the index in order to avoid the date column being dropped during the calculation.
> ```python
> # Convert Date Column to Index first so does not get dropped
> roll_df = before_washing.set_index('date')
> roll_df = roll_df.rolling(window=6).mean()
> ```

>[!tip]- Highlighting Subsections of a Line Charts
>Copy-paste and then modify the Matplotlib chart from before to plot the monthly death rates (instead of the total number of births and deaths).
>- Add 3 seperate lines to the plot: the death rate before handwashing, after handwashing, and the 6-month moving average before handwashing.
> - Show the monthly death rate before handwashing as a thin dashed black line.
> - Show the moving average as a thicker, crimon line.
> - Show the rate after handwashing as a skyblue line with round markers.
> - Look at the [code snippet in the documentation to see how you can add a legend](https://www.google.com/url?q=https%3A%2F%2Fmatplotlib.org%2F3.1.1%2Fapi%2F_as_gen%2Fmatplotlib.pyplot.legend.html) to the chart.
> ```python
> plt.figure(figsize=(14,8), dpi=200)
> plt.title('Percentage of Monthly Deaths over Time', fontsize=18)
> plt.yticks(fontsize=14)
> plt.xticks(fontsize=14, rotation=45)
>   
> plt.ylabel('Percentage of Deaths', color='crimson', fontsize=18)
>   
> ax = plt.gca()
> ax.xaxis.set_major_locator(years)
> ax.xaxis.set_major_formatter(years_fmt)
> ax.xaxis.set_minor_locator(months)
> ax.set_xlim([df_monthly.date.min(), df_monthly.date.max()])
> 
> plt.grid(color='grey', linestyle='--')
>   
> ma_line, = plt.plot(roll_df.index,
>                     roll_df.pct_deaths,
>                     color='crimson',
>                     linewidth=3,
>                     linestyle='--',
>                     label='6m Moving Average')
> bw_line, = plt.plot(before_washing.date,
>                     before_washing.pct_deaths,
>                     color='black',
>                     linewidth=1,
>                     linestyle='--',
>                     label='Before Handwashing')
> aw_line, = plt.plot(after_washing.date,
>                     after_washing.pct_deaths,
>                     color='skyblue',
>                     linewidth=3,
>                     marker='o',
>                     label='After Handwashing')
>   
> plt.legend(handles=[ma_line, bw_line, aw_line],
>            fontsize=18)
> ```
> ![[Day 80 - Subsections of Line Chart.png]]

## Visualising Distributions and Testing for Statistical Significance

>[!tip]- Calculate the Difference in the Average Monthly Death Rate
> - What was the average percentage of monthly deaths before handwashing?
> - What was the average percentage of monthly deaths after handwashing was made obligatory?
> - By how much did handwashing reduce the average chance of dying in childbirth in percentage terms?
> - How do these numbers compare to the average for all the 1840s that we calculated earlier?
> - How many times lower are the chances of dying after handwashing compared to before?
> ```python
> avg_prob_before = before_washing.pct_deaths.mean() * 100
> print(f'Chance of death during childbirth before handwashing: {avg_prob_before:.3}%.')
>   
> avg_prob_after = after_washing.pct_deaths.mean() * 100
> print(f'Chance of death during childbirth AFTER handwashing: {avg_prob_after:.3}%.')
>   
> mean_diff = avg_prob_before - avg_prob_after
> print(f'Handwashing reduced the monthly proportion of deaths by {mean_diff:.3}%!')
>   
> times = avg_prob_before / avg_prob_after
> print(f'This is a {times:.2}x improvement!')
> ```

>[!tip]- Use Box Plots to Show How the Death Rate Changed Before and After Handwashing
>- Use [NumPy's `.where()` function](https://www.google.com/url?q=https%3A%2F%2Fnumpy.org%2Fdoc%2Fstable%2Freference%2Fgenerated%2Fnumpy.where.html) to add a column to `df_monthly` that shows if a particular date was before or after the start of handwashing.
> - Then use plotly to create box plot of the data before and after handwashing.
> - How did key statistics like the mean, max, min, 1st and 3rd quartile changed as a result of the new policy?
> ```python
> # NumPy .where() method
> df_monthly['washing_hands'] = np.where(df_monthly.date < handwashing_start, 'No', 'Yes')
> 
> box = px.box(df_monthly,
>              x='washing_hands',
>              y='pct_deaths',
>              color='washing_hands',
>              title='How Have the Stats Changed with Handwashing?')
>   
> box.update_layout(xaxis_title='Washing Hands?',
>                   yaxis_title='Percentage of Monthly Deaths',)
> ```
> ![[Day 80 - The Effect of Handwashing.png]]

>[!tip]- Use Histograms to Visualise the Monthly Distribution of Outcomes
>Create a [plotly histogram](https://www.google.com/url?q=https%3A%2F%2Fplotly.com%2Fpython%2Fhistograms%2F) to show the monthly percentage of deaths.
> - Use docs to check out the available parameters. Use the [`color` parameter](https://www.google.com/url?q=https%3A%2F%2Fplotly.github.io%2Fplotly.py-docs%2Fgenerated%2Fplotly.express.histogram.html) to display two overlapping histograms.
> - The time period of handwashing is shorter than not handwashing. Change `histnorm` to `percent` to make the time periods comparable.
> - Make the histograms slighlty transparent
> - Experiment with the number of bins on the histogram. Which number work well in communicating the range of outcomes?
> - Just for fun, display your box plot on the top of the histogram using the `marginal` parameter.
> ```python
> hist = px.histogram(df_monthly,
>                    x='pct_deaths',
>                    color='washing_hands',
>                    nbins=30,
>                    opacity=0.6,
>                    barmode='overlay',
>                    histnorm='percent',
>                    marginal='box',)
>   
> hist.update_layout(xaxis_title='Proportion of Monthly Deaths',
>                    yaxis_title='Count',)
> ```
> ![[Day 80 - Histogram of Monthly outcomes distribution.png]]

>[!tip]- Use a Kernel Density Estimate (KDE) to visualise a smooth distribution
>Use [Seaborn's `.kdeplot()`](https://www.google.com/url?q=https%3A%2F%2Fseaborn.pydata.org%2Fgenerated%2Fseaborn.kdeplot.html) to create two kernel density estimates of the `pct_deaths`, one for before handwashing and one for after.
> - Use the `shade` parameter to give your two distributions different colours.
> - What weakness in the chart do you see when you just use the default parameters?
> - Use the `clip` parameter to address the problem.
> ```python
> plt.figure(dpi=200)
> 
> # By default the distribution estimate includes a negative death rate!
> sns.kdeplot(before_washing.pct_deaths, fill=True)
> sns.kdeplot(after_washing.pct_deaths, fill=True)
> plt.title('Est. Distribution of Monthly Death Rate Before and After Handwashing')
> ```
> ![[Day 80 - KDE Bad.png]]
> However, the problem is that we end up with a negative monthly death rate on the left tail. The doctors would be very surprised indeed if a corpse came back to life after an autopsy! The solution is to specify a lower bound of 0 for the death rate.
> ```python
> plt.figure(dpi=200)
> sns.kdeplot(before_washing.pct_deaths,
>             fill=True,
>             clip=(0,1))
> sns.kdeplot(after_washing.pct_deaths,
>             fill=True,
>             clip=(0,1))
> plt.title('Est. Distribution of Monthly Death Rate Before and After Handwashing')
> plt.xlim(0, 0.40)
> ```
> ![[Day 80 - KDE Good.png]]

Now that we have an idea of what the two distributions look like, we can further strengthen our argument for handwashing by using a statistical test. We can test whether our distributions ended up looking so different purely by chance (i.e., the lower death rate is just an accident) or if the 8.4% difference in the average death rate is **statistically significant**.

>[!tip]- Use a T-Test to Show Statistical Significance
>Use a t-test to determine if the differences in the means are statistically significant or purely due to chance.
> If the p-value is less than 1% then we can be 99% certain that handwashing has made a difference to the average monthly death rate.
> - Import `stats` from scipy
> - Use the [`.ttest_ind()` function](https://www.google.com/url?q=https%3A%2F%2Fdocs.scipy.org%2F%255Ddoc%2Fscipy%2Freference%2Fgenerated%2Fscipy.stats.ttest_ind.html) to calculate the t-statistic and the p-value
> - Is the difference in the average proportion of monthly deaths statistically significant at the 99% level?
> ```python
> t_stat, p_value = stats.ttest_ind(a=before_washing.pct_deaths,
>                                   b=after_washing.pct_deaths)
> print(f'p-palue is {p_value:.10f}')
> print(f't-statstic is {t_stat:.4}')
> ```

# Packages
```python
import pandas as pd
import numpy as np
import plotly.express as px
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
  
import scipy.stats as stats
```


> [!tip]+ Packages
> - [[Pandas]]
> - [[Numpy]]
> - [[Plotly]]
> - [[Seaborn]]
> - [[Matplotlib]]
> - [[Scipy|scipy.stats]]

<hr />

```dataviewjs
dv.view("customJS/navPY")
```

