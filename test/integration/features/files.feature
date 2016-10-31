Feature: Files

  Scenario: default prompt answers
    Given the user reponds to all prompts
    When the generator is run
    Then the core files should be present
    And the user provided answers should be used
    And reusable prompt answers are persisted

  Scenario: manual prompt answers
    Given the user leaves defaults in all prompts
    When the generator is run
    Then the core files should be present
    And the default answers should be used
