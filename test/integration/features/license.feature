Feature: License

  Scenario: MIT
    Given the "MIT" license is chosen
    And the user responds to all prompts
    When the generator is run
    Then the license file should be populated

  Scenario: Unlicensed
    Given the repo should not be licensed
    When the generator is run
    Then the license file should not be populated
