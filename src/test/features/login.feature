Feature: login
  Scenario: #1 Correctly Login
    Given user go to login page
    When user login with validate "tomsmith" and "SuperSecretPassword!"
    Then user able to login success
