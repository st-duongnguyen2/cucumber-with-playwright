Feature: Lottery purchase

  @user=emptyLotteryUser
  Scenario: #1 Correctly Lottery History without item
    Given User goto Lottery Page
    Then User should see empty lottery display '抽選販売申込履歴はありません'

  @user=lotteryUser
  Scenario: #2 Correctly Lottery History with items
    Given User goto Lottery Page
    Then User should see lottery display

  @user=lotteryUser
  Scenario: #3 Successfully move to Lottery Cart
    Given User goto Lottery Page
    When User process checkout
    Then User should see add lottery to cart successfully
