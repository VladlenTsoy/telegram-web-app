import {ProductSize} from "types/Menu"

// Параметры для запроса купона
export interface CouponSentParams {
    organizationId: "84f0f1ff-1ba0-4857-bfc6-1ae23b0b4cb1"
    order: {
        phone: string
        customer: {
            name: string
            phone: string
        }
        orderServiceType: "DeliveryByCourier"
        items: (CouponSentProduct | CouponSentDish)[]
    }
    iikoCard5Info: {
        coupon: string
    }
    coupon: string
}

export interface CouponSentProduct {
    productId: string
    name: string
    comboInformation: null
    image: string
    category: "pizza"
    type: "Product"
    modifiers: CouponSentProductModifier[]
    amount: number
    price: number
}

export interface CouponSentDish {
    productId: string
    name: string
    comboInformation: null
    image: string
    category: "dish"
    amount: number
    type: "Product"
    modifiers: CouponSentProductModifier[]
    price: number
}

export interface CouponSentProductModifier {
    productGroupId: string
    amount: number
    price: number
    productId: string
}

// Купон
export interface Coupon {
    marketingCampaignId: "fe470000-906b-0025-c091-08d8bfa5ea6b"
    name: string
    discounts: {
        amount: number
        code: number
        comment: null
        discountSum: number
        orderItemId: string
    }[]
    upsales: {
        productCodes: []
        sourceActionId: string
        suggestionText: string
    }[]
    freeProducts: [
        {
            sourceActionId: "fe470000-906b-0025-782b-08d8bfa618ed"
            descriptionForUser: ""
            products: [
                {
                    id: "95aea8af-0f44-4392-9d27-4aa9d532804e"
                    code: "00619"
                    size: []
                }
            ]
        }
    ]
    availableComboSpecifications: []
    availableCombos: []
    needToActivateCertificate: false
    actions: [
        {
            id: "fe470000-906b-0025-782b-08d8bfa618ed"
            checkSum: "ZAQVWlSG6fVsnsxLMzCBAhYa1TvNfmHvH7t3jm0i3p4="
            settings: {
                IncludeModifiers: false
                Caption: ""
                Items: [
                    {
                        Code: "00619"
                        Sizes: []
                        DisplayName: ""
                    }
                ]
                WithdrawFromWalletOnUse: false
                WithdrawalMultiplier: 0
            }
            typeName: "LoyaltyProgramEngine.Actions.PresentBonusAction"
            items: ProductSize[]
        }
    ]
    conditions: [
        | {
              id: string
              checkSum: string
              settings: {
                  OrderSum: number
                  Operation: number
                  MultiplicityEnabled: boolean
                  MaskItems: []
              }
              typeName: "LoyaltyProgramEngine.Conditions.OrderSumCondition"
          }
        | {
              id: string
              checkSum: string
              settings: {
                  PresenceType: number
                  CouponSeriesIds: string[]
              }
              typeName: "LoyaltyProgramEngine.Conditions.CouponCondition"
          }
    ]
    marketing: {
        id: "fe470000-906b-0025-c091-08d8bfa5ea6b"
        programId: "fe470000-906b-0025-1e00-08d8bfa5e540"
        organizationId: null
        networkId: "d783fefd-b479-11ea-aa5c-0025906bfe47"
        description: null
        descriptionForUsers: null
        name: "12025"
        nameForUser: null
        canHoldMoney: 0
        isActive: 1
        periodFrom: "2021-01-23"
        periodTo: null
        orderActionConditionBindings: [
            {
                id: "fe470000-906b-0025-e0bc-08d8bfa618ec"
                actions: [
                    {
                        id: "fe470000-906b-0025-782b-08d8bfa618ed"
                        checkSum: "ZAQVWlSG6fVsnsxLMzCBAhYa1TvNfmHvH7t3jm0i3p4="
                        settings: '{"IncludeModifiers":false,"Caption":"","Items":[{"Code":"00619","Sizes":[],"DisplayName":""}],"WithdrawFromWalletOnUse":false,"WithdrawalMultiplier":0}'
                        typeName: "LoyaltyProgramEngine.Actions.PresentBonusAction"
                    }
                ]
                conditions: [
                    {
                        id: "fe470000-906b-0025-e596-08d8bfa618ed"
                        checkSum: "90TD0f7k07Q1ub6a9sgnKEGQEZ1UOHrDZvkPFX3LAK0="
                        settings: '{"PresenceType":1,"CouponSeriesIds":["fe470000-906b-0025-9201-08d8bfa5b33a"]}'
                        typeName: "LoyaltyProgramEngine.Conditions.CouponCondition"
                    },
                    {
                        id: "fe470000-906b-0025-2993-08d8bfa618ee"
                        checkSum: "Gsaq6F4ht/H1YUVGozk9ay2+BnrxoZGVDA8JIgqqdoo="
                        settings: '{"OrderSum":120000.0,"Operation":4,"MultiplicityEnabled":false,"MaskItems":[]}'
                        typeName: "LoyaltyProgramEngine.Conditions.OrderSumCondition"
                    }
                ]
                stopFurtherExecution: false
            }
        ]
        overdraftActionConditionBindings: []
        periodicActionConditionBindings: []
    }
}
