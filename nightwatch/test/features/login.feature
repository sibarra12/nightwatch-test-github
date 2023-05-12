
Feature: Feature name

    Feature Description
    @test1
    Scenario Outline: Scenario name
        Given estoy en la pagina de continental
        When ingreso el usuario "<user>"
        And ingreso el password "<password>"
        And hago click en el login button
        Then se visualiza el ingreso al dashboard
    Examples:
        | user      | password              |
        | ContiDBP  | WeBuildGreatSoftw@re! |

