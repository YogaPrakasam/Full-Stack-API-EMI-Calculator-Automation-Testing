import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { EmiCalculatorPage } from "../pages/emi-calculator.page";

// Select Personal Loan calculator
When(
    "I select the Personal Loan calculator",
    async function (this: CustomWorld) {

        const emiPage = new EmiCalculatorPage(this.page);

        await emiPage.openPersonalLoanTab();
    }
);





// Set Loan Amount using slider
When(
    "I set the loan amount to {int} using the slider",
    async function (this: CustomWorld, amount: number) {

        const emiPage = new EmiCalculatorPage(this.page);

        const steps = amount / 10000;

        await emiPage.setSliderSteps(
            emiPage.loanAmountSlider,
            steps
        );
    }
);

// Set Interest Rate using slider
When(
    "I set the interest rate to {int} using the slider",
    async function (this: CustomWorld, rate: number) {

        const emiPage = new EmiCalculatorPage(this.page);

        const steps = (rate - 5) / 0.25;

        await emiPage.setSliderSteps(
            emiPage.interestRateSlider,
            steps
        );
    }
);

// Set Loan Tenure using slider
When(
    "I set the loan tenure to {int} years using the slider",
    async function (this: CustomWorld, tenure: number) {

        const emiPage = new EmiCalculatorPage(this.page);

        const steps = tenure / 0.25;

        await emiPage.setSliderSteps(
            emiPage.loanTenureSlider,
            steps
        );
    }
);




// Navigate to EMI Calculator
Given(
  "I navigate to the EMI Calculator website",
  async function (this: CustomWorld) {
    const emiUrl = process.env.EMI_CALCULATOR_URL;

    if (!emiUrl) {
      throw new Error("EMI_CALCULATOR_URL is not configured in the environment");
    }

    await this.page.goto(emiUrl);
  }
);

// Select Home Loan
When(
"I select the Home Loan calculator",
async function (this: CustomWorld) {
await this.page.getByText("Home Loan", { exact: true }).click();
}
);

// Enter Home Loan details
When(
"I enter loan amount {string}, interest rate {string}, and loan tenure {string}",
async function (
this: CustomWorld,
amount: string,
rate: string,
tenure: string
) {
await this.page.locator("#loanamount").fill(amount);
await this.page.locator("#loaninterest").fill(rate);
await this.page.locator("#loanterm").fill(tenure);
}
);

When("I calculate the EMI", async function (this: CustomWorld) {
  const emiPage = new EmiCalculatorPage(this.page);
  await emiPage.calculateEMI();
});

Then(
  "the displayed EMI should match the independently calculated EMI",
  async function (this: CustomWorld) {
    const amount = Number(
      (await this.page.locator("#loanamount").inputValue()).replace(/,/g, "")
    );

    const rate = Number(
      await this.page.locator("#loaninterest").inputValue()
    );

    const tenure = Number(
      await this.page.locator("#loanterm").inputValue()
    );

    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;

    const expectedEMI =
      (amount *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const emiPage = new EmiCalculatorPage(this.page);
    const actualEMI = await emiPage.getDisplayedEMI();

    console.log("Expected EMI:", Math.round(expectedEMI));
    console.log("Actual EMI:", actualEMI);

    if (Math.abs(Math.round(expectedEMI) - actualEMI) > 2) {
      throw new Error("Displayed EMI does not match expected EMI");
    }
  }
);

Then(
  "the pie chart should be visible",
  async function (this: CustomWorld) {
    await this.page.locator("#emipiechart").waitFor({
      state: "visible"
    });
  }
);

Then(
  "the numeric values in the pie chart sections should be greater than zero",
  async function (this: CustomWorld) {
    const emiPage = new EmiCalculatorPage(this.page);
    await emiPage.verifyPieChart();
  }
);




When(
  "I change the EMI schedule starting month using the calendar",
  async function (this: CustomWorld) {
    const emiPage = new EmiCalculatorPage(this.page);
    await emiPage.changeStartingMonth();
  }
);

Then(
  "the EMI bar chart should be visible",
  async function (this: CustomWorld) {
    const emiPage = new EmiCalculatorPage(this.page);
    await emiPage.verifyBarChart();
  }
);

Then(
  "I should be able to count the bars in the chart",
  async function (this: CustomWorld) {
    const emiPage = new EmiCalculatorPage(this.page);
    await emiPage.countChartBars();
  }
);

Then(
  "I should be able to retrieve and validate a bar tooltip",
  async function (this: CustomWorld) {
    const emiPage = new EmiCalculatorPage(this.page);
    await emiPage.verifyBarTooltip();
  }
);