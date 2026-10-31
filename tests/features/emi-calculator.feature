Feature: EMI Calculator Automation

Background:
Given I navigate to the EMI Calculator website

@home-loan
Scenario Outline: Calculate Home Loan EMI and validate pie chart
When I select the Home Loan calculator
And I enter loan amount "<amount>", interest rate "<rate>", and loan tenure "<tenure>"
And I calculate the EMI
Then the displayed EMI should match the independently calculated EMI
And the pie chart should be visible
And the numeric values in the pie chart sections should be greater than zero


Examples:
  | amount  | rate | tenure |
  | 2500000 | 10   | 10     |
  | 5000000 | 7.5  | 15     |


@personal-loan
Scenario: Calculate Personal Loan EMI using sliders and validate payment schedule
When I select the Personal Loan calculator
And I set the loan amount to 1000000 using the slider
And I set the interest rate to 12 using the slider
And I set the loan tenure to 5 years using the slider
And I change the EMI schedule starting month using the calendar
Then the EMI bar chart should be visible
And I should be able to count the bars in the chart
And I should be able to retrieve and validate a bar tooltip




