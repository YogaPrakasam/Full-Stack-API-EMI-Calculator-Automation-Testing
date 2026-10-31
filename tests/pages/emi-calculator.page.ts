import { Page, Locator } from '@playwright/test';

export class EmiCalculatorPage {
readonly page: Page;

readonly personalLoanTab: Locator;
readonly loanAmountSlider: Locator;
readonly interestRateSlider: Locator;
readonly loanTenureSlider: Locator;
readonly loanAmountInput: Locator;
readonly interestRateInput: Locator;
readonly loanTenureInput: Locator;

constructor(page: Page) {
this.page = page;


this.personalLoanTab = page.getByText('Personal Loan', {
  exact: true,
});

this.loanAmountSlider = page.locator(
  '#loanamountslider .ui-slider-handle'
);

this.interestRateSlider = page.locator(
  '#loaninterestslider .ui-slider-handle'
);

this.loanTenureSlider = page.locator(
  '#loantermslider .ui-slider-handle'
);

this.loanAmountInput = page.locator('#loanamount');
this.interestRateInput = page.locator('#loaninterest');
this.loanTenureInput = page.locator('#loanterm');


}

async openPersonalLoanTab(): Promise<void> {
await this.personalLoanTab.click();
}

async setSliderSteps(
slider: Locator,
steps: number
): Promise<void> {
await slider.focus();
await slider.press('Home');


for (let i = 0; i < steps; i++) {
  await slider.press('ArrowRight');
}


}

async setPersonalLoanValues(): Promise<void> {
await this.setSliderSteps(this.loanAmountSlider, 100);
await this.setSliderSteps(this.interestRateSlider, 28);
await this.setSliderSteps(this.loanTenureSlider, 20);
}

async verifyPersonalLoanValues(): Promise<void> {
  await this.loanAmountInput.waitFor({ state: 'visible' });

  const amount = await this.loanAmountInput.inputValue();
  const interest = await this.interestRateInput.inputValue();
  const tenure = await this.loanTenureInput.inputValue();

  console.log('Personal Loan Values:', {
    amount,
    interest,
    tenure,
  });

  if (amount.replace(/,/g, '') !== '1000000') {
    throw new Error(`Expected loan amount 1000000, received ${amount}`);
  }

  if (interest !== '12') {
    throw new Error(`Expected interest rate 12, received ${interest}`);
  }

  if (tenure !== '5') {
    throw new Error(`Expected loan tenure 5, received ${tenure}`);
  }
}

async calculateEMI(): Promise<void> {
  await this.loanAmountInput.press("Tab");
  await this.page.waitForTimeout(2000);
}

async getDisplayedEMI(): Promise<number> {
  const text = await this.page.locator("body").innerText();

  const match = text.match(/Loan EMI\s*₹\s*([\d,]+)/);

  if (!match) {
    throw new Error("Could not find displayed EMI");
  }

  return Number(match[1].replace(/,/g, ""));
}

async verifyPieChart(): Promise<void> {
  await this.page.locator("#emipiechart").waitFor({
    state: "visible"
  });

  const values = await this.page
    .locator("#emipiechart .highcharts-data-labels text")
    .allTextContents();

  if (values.length < 2) {
    throw new Error("Pie chart values were not found");
  }

  for (const value of values) {
    const number = Number(value.replace("%", "").trim());

    if (number <= 0) {
      throw new Error(`Invalid pie chart value: ${value}`);
    }
  }
}



async changeStartingMonth(): Promise<void> {
  // Open the calendar
  await this.page.locator("#startmonthyear").click();

  // Select November 2026
  await this.page.locator(
    ".datepicker-months span.month"
  ).filter({ hasText: "Nov" }).click();

  await this.page.waitForTimeout(1000);
}

async verifyBarChart(): Promise<void> {
  await this.page.locator("#emibarchart").waitFor({
    state: "visible",
  });
}

async countChartBars(): Promise<number> {
  const bars = this.page.locator(
    "#emibarchart .highcharts-column-series rect.highcharts-point"
  );

  const count = await bars.count();

  console.log("Total bars in chart:", count);

  if (count === 0) {
    throw new Error("No bars were found in the EMI bar chart");
  }

  return count;
}

async verifyBarTooltip(): Promise<void> {
  const firstBar = this.page.locator(
    "#emibarchart .highcharts-column-series rect.highcharts-point"
  ).first();

  await firstBar.scrollIntoViewIfNeeded();
  await firstBar.hover();

  const tooltip = this.page.locator(
    "#emibarchart .highcharts-tooltip"
  );

  await tooltip.waitFor({
    state: "visible",
  });

  const tooltipText = await tooltip.textContent();

  console.log("Bar tooltip:", tooltipText);

  if (!tooltipText || tooltipText.trim().length === 0) {
    throw new Error("Bar tooltip is empty");
  }
}
}

