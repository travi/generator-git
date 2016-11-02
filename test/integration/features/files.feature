Feature: Files

  Scenario: manual prompt answers
    Given the user responds to all prompts
    And the "MIT" license is chosen
    When the generator is run
    Then the core files should be present
    And the user provided answers should be used
    And reusable prompt answers are persisted

  Scenario: default prompt answers
    Given the user leaves defaults in all prompts
    And the "MIT" license is chosen
    When the generator is run
    Then the core files should be present
    And the default answers should be used
