# AI-Assisted Self-Healing Locators

## 1. Objective

The purpose of this exercise is to demonstrate how AI can help identify and repair broken or brittle Playwright locators when application UI elements change.

## 2. Locator Failure Detection

Playwright failures can indicate that a locator is no longer valid.

Examples include:
- Element not found.
- Timeout while waiting for an element.
- Strict mode violation.
- Element is not visible or interactive.

When these failures occur, the test execution logs and error messages can be analysed using an AI coding assistant.

## 3. AI-Assisted Repair Approach

The following workflow can be used:

1. Execute the Playwright test suite.
2. Identify failed tests and inspect locator-related errors.
3. Capture the relevant page HTML or DOM snapshot.
4. Provide the failing locator, error message, and DOM information to an AI assistant.
5. Ask AI to suggest a more reliable locator using accessible roles, labels, text, or test IDs.
6. Review the suggested locator manually.
7. Verify that the locator identifies the intended element.
8. Execute the affected test again.
9. Run the complete test suite to check for regressions.

## 4. Example AI Prompt

"The following Playwright locator is failing because the application UI has changed.

Original locator: page.locator('.old-submit-button')

Please inspect the supplied DOM and suggest a more resilient locator using Playwright best practices. Prefer getByRole, getByLabel, getByText, or getByTestId where appropriate.

Explain why your suggested locator is more reliable. Do not assume element attributes that are not present in the supplied DOM."

## 5. Validation Before Applying Fixes

AI-generated locator suggestions should never be accepted blindly.

Validation includes:
- Checking the actual DOM.
- Confirming the locator matches the intended element.
- Checking for multiple matches.
- Verifying visibility and enabled state.
- Executing the affected test.
- Running the complete regression suite.

## 6. Benefits

AI-assisted self-healing can:
- Reduce maintenance effort.
- Help identify outdated selectors.
- Improve locator reliability.
- Speed up debugging.
- Support maintainable automation frameworks.

## 7. Limitations

AI may suggest incorrect selectors or hallucinate attributes that do not exist. Human review and actual test execution are essential before applying any suggested repair.


## 8. Intentionally Brittle Locator Demonstration

The project includes five deliberately incorrect locator examples in:

`tests/ai-self-healing/brittle-locators.spec.ts`

The examples cover:

1. Loan amount input
2. Interest rate input
3. Loan tenure input
4. EMI result section
5. EMI chart

These locators are intentionally incorrect to demonstrate how an AI-assisted locator repair workflow can identify and suggest replacements for failing selectors.

The five demonstration tests are marked as skipped (`test.skip`) so they remain available for assessment and review without introducing intentional failures into the regular test execution.

### Proposed AI-Assisted Repair Workflow

1. Execute the failing locator independently.
2. Capture the failure message, relevant DOM structure, and screenshot.
3. Provide the evidence and incorrect locator to an AI assistant.
4. Ask the assistant to identify a stable replacement locator.
5. Verify the suggested locator against the live application.
6. Re-run the test and confirm the expected behaviour.

### Example AI Prompt

"Analyse this Playwright locator failure. Review the supplied DOM structure and identify a reliable locator for the loan amount input. Prefer stable IDs, labels, accessible roles, or other meaningful attributes. Explain why the original locator failed and provide the corrected Playwright locator."

### Validation

The regular Playwright suite currently reports:

* 9 API tests passed.
* 5 intentionally skipped AI locator demonstrations.
* 0 failed tests.

The demonstration illustrates the proposed AI-assisted repair process; automatic self-healing has not been implemented in the framework.
