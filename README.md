
<img src="https://kore.ai/wp-content/uploads/kore.ai_logo.svg" alt="kore.ai" width="200"/>

# Service Mapping Tool
 a tool to create wrapper through ui.

## SMT Apis :-
* [Create Adapter](#Create-Adapter)
* [Get All Adapter](#Get-All-Adapter)
* [Get A Single Adapter Definition](#Get-a-Single-Adapter-Definition)
* [Update An Adapter](#Update-An-Adapter)
* [Delete An Adapter](#Delete-An-Adapter)
* [Create apiDefinition](#Create-apiDefinition)
* [Get apiDefinition](#Get-apiDefinition)
* [Update apiDefinition](#Update-apiDefinition)
* [Delete apiDefinition](#Delete-apiDefinition)
* [Get apiDefinition By OperationId](#Get-apiDefinition-By-OperationId)
* [Get apiDefinition By Source Operation Id](#Get-apiDefinition-By-Source-Operation-Id)
* [Create Mapping](#Create-Mapping)
* [Update Mapping](#Update-Mapping)
* [Delete Mapping](#Delete-Mapping)
* [Publish Adapter](#Publish-Adapter)
* [Upgrade Adapter](#Upgrade-Adapter)

### Create Adapter
   > It creates new adpater.\
   \
   **url** = ```POST /smt/adapterDefinition```\
   \
     **request body** =    ```{
  "name": "FISAdapter",
  "displayName": "FIS adapter",
  "hostProfiles": [
    {
      "name": "FIS",
      "type": "URL",
      "url": "",
      "authentication": {
        "type": "oauth2"
      },
      "host": "https://api-gw-uat.fisglobal.com",
      "security": [
        {
          "type": "internal"
        }
      ]
    }
  ],
  "connectionTye": "webservice",
  "connectionMode": "rest",
  "variables": [
    {
      "title": "organization-id",
      "in": "header",
      "value": "",
      "required": "true",
      "description": ""
    }
  ]
}```\
\
**response** = ```{
    "_id": "5fbfc688b47c451cd4c4610d",
    "name": "FISAdapter",
    "displayName": "FIS adapter",
    "version": "1.0",
    "hostProfiles": [
        {
            "_id": "5fbfc688b47c451cd4c4610e",
            "name": "FIS",
            "type": "URL",
            "url": "",
            "authentication": {
                "type": "oauth2"
            },
            "host": "https://api-gw-uat.fisglobal.com",
            "security": [
                {
                    "_id": "5fbfc688b47c451cd4c4610f",
                    "type": "internal"
                }
            ]
        }
    ],
    "connectionTye": "webservice",
    "connectionMode": "rest",
    "variables": [
        {
            "_id": "5fbfc688b47c451cd4c46110",
            "title": "organization-id",
            "in": "header",
            "value": "",
            "required": "true",
            "description": ""
        }
    ],
    "status": "In development",
    "lastUpdated": "Thu Nov 26 2020 20:45:20 GMT+0530 (India Standard Time)",
    "adapterId": "391c0242-c773-47cd-b815-2dbb38d05599",
    "__v": 0
}```


### Get All Adapter
> it fetches all the adapter defintions.\
  \
  **url** = ```GET /smt/adapterDefinition```\
  \
  **response** = ```[
    {
        "_id": "5fbfc668b47c451cd4c46109",
        "name": "FISAdapter",
        "displayName": "FIS adapter",
        "version": "1.0",
        "hostProfiles": [
            {
                "authentication": {
                    "type": "oauth2"
                },
                "security": [
                    {
                        "_id": "5fbfc668b47c451cd4c4610b",
                        "type": "internal"
                    }
                ],
                "_id": "5fbfc668b47c451cd4c4610a",
                "name": "FIS",
                "type": "URL",
                "url": "",
                "host": "https://api-gw-uat.fisglobal.com"
            }
        ],
        "connectionTye": "webservice",
        "connectionMode": "rest",
        "variables": [
            {
                "_id": "5fbfc668b47c451cd4c4610c",
                "title": "organization-id",
                "in": "header",
                "value": "",
                "required": "true",
                "description": ""
            }
        ],
        "status": "In development",
        "lastUpdated": "Thu Nov 26 2020 20:44:48 GMT+0530 (India Standard Time)",
        "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
        "__v": 0
    },
    {
        "_id": "5fbfc688b47c451cd4c4610d",
        "name": "FISAdapter",
        "displayName": "FIS adapter",
        "version": "1.0",
        "hostProfiles": [
            {
                "authentication": {
                    "type": "oauth2"
                },
                "security": [
                    {
                        "_id": "5fbfc688b47c451cd4c4610f",
                        "type": "internal"
                    }
                ],
                "_id": "5fbfc688b47c451cd4c4610e",
                "name": "FIS",
                "type": "URL",
                "url": "",
                "host": "https://api-gw-uat.fisglobal.com"
            }
        ],
        "connectionTye": "webservice",
        "connectionMode": "rest",
        "variables": [
            {
                "_id": "5fbfc688b47c451cd4c46110",
                "title": "organization-id",
                "in": "header",
                "value": "",
                "required": "true",
                "description": ""
            }
        ],
        "status": "In development",
        "lastUpdated": "Thu Nov 26 2020 20:45:20 GMT+0530 (India Standard Time)",
        "adapterId": "391c0242-c773-47cd-b815-2dbb38d05599",
        "__v": 0
    }
]```

### Get A Single Adapter Definition
> it accepts `adapterId` as path param and returns the adapter definition. \
  \
  **url** = ```GET /smt/adapterDefinition/{adapterId}``` \
  \
  **response** = ```{
  "_id": "5fbfc668b47c451cd4c46109",
  "name": "FISAdapter",
  "displayName": "FIS adapter",
  "version": "1.0",
  "hostProfiles": [
    {
      "authentication": {
        "type": "oauth2"
      },
      "security": [
        {
          "_id": "5fbfc668b47c451cd4c4610b",
          "type": "internal"
        }
      ],
      "_id": "5fbfc668b47c451cd4c4610a",
      "name": "FIS",
      "type": "URL",
      "url": "",
      "host": "https://api-gw-uat.fisglobal.com"
    }
  ],
  "connectionTye": "webservice",
  "connectionMode": "rest",
  "variables": [
    {
      "_id": "5fbfc668b47c451cd4c4610c",
      "title": "organization-id",
      "in": "header",
      "value": "",
      "required": "true",
      "description": ""
    }
  ],
  "status": "In development",
  "lastUpdated": "Thu Nov 26 2020 20:44:48 GMT+0530 (India Standard Time)",
  "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
  "__v": 0,
  "apiDefinitions": [
    [
      {
        "sourceAPI": {
          "category": "Banking",
          "operationId": "DeletePayee",
          "method": "DELETE",
          "path": "Payee"
        },
        "_id": "5fbfd36a0bbeed2aa8a24680",
        "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
        "apiDefinitionId": "72068c90-02ae-4fce-845f-771c05356551",
        "sourceOperationId": "DeletePayee",
        "content": [
          {
            "endPoint": {
              "host": "api-gw-uat.fisglobal.com",
              "port": "",
              "path": "/api/bill-pay/payee-services/v1",
              "protocol": "https",
              "content-type": "application/json",
              "method": "delete"
            },
            "dependsOn": [],
            "headerParams": [
              {
                "_id": "5fbfd36a0bbeed2aa8a24682",
                "title": "contextToken",
                "required": "true",
                "in": "header"
              },
              {
                "_id": "5fbfd36a0bbeed2aa8a24683",
                "title": "fe_id",
                "required": "true",
                "in": "header"
              },
              {
                "_id": "5fbfd36a0bbeed2aa8a24684",
                "title": "locale",
                "required": "true",
                "in": "header"
              },
              {
                "_id": "5fbfd36a0bbeed2aa8a24685",
                "title": "uuid",
                "required": "true",
                "in": "header"
              },
              {
                "_id": "5fbfd36a0bbeed2aa8a24686",
                "title": "application_id",
                "required": "true",
                "in": "header"
              },
              {
                "_id": "5fbfd36a0bbeed2aa8a24687",
                "title": "source_id",
                "required": "true",
                "in": "header"
              },
              {
                "_id": "5fbfd36a0bbeed2aa8a24688",
                "title": "user_id",
                "required": "true",
                "in": "header"
              },
              {
                "_id": "5fbfd36a0bbeed2aa8a24689",
                "title": "correlation_id",
                "required": "true",
                "in": "header"
              },
              {
                "_id": "5fbfd36a0bbeed2aa8a2468a",
                "title": "environment_id",
                "required": "true",
                "in": "header"
              }
            ],
            "requestParams": [
              {
                "_id": "5fbfd36a0bbeed2aa8a2468b",
                "title": "payeeId",
                "required": "true",
                "in": "path"
              }
            ],
            "responseParams": [],
            "hostInfo": [],
            "_id": "5fbfd36a0bbeed2aa8a24681",
            "name": "Removes a specific payee.",
            "operationId": "deletePayee",
            "sequenceId": "1"
          }
        ],
        "__v": 0
      }
    ]
  ]
  }```
  
  ### Update An Adapter
  > It requires `adapterId` as path param and the updated fields in request body. Then it will update the adapter defintion with new changes. \
    \
    **url** = ```PUT /smt/adapterDefinition/{adapterId}``` \
    \
    **request body** = ```{
 "name":"FIS Adapter",
  "displayName": "FIS adapter Updated",
  "hostProfiles": [
    {
      "name": "FIS",
      "type": "URL",
      "url": "",
      "authentication": {
        "type": "oauth2"
      },
      "host": "https://api-gw-uat.fisglobal.com",
      "security": [
        {
          "type": "internal"
        }
      ]
    }
  ],
  "connectionTye": "webservice",
  "connectionMode": "rest",
  "variables": [
    {
      "title": "organization-id",
      "in": "header",
      "value": "",
      "required": "true",
      "description": ""
    }
  ]
}``` \
\
  **response** = ```{ msg: "Adapter updated successfully." }```

### Delete An Adapter
> It requires `adapterId` as path param and will delete that adapter definition. \
  \
  **url** = ```DELETE /smt/adapterDefinition/{adapterId}``` \
  \
  **response** = ```{ msg: "Adapter definition deleted successfully." }```
  
 ### Create apiDefinition
 > It accepts `adapterId` as path param and apiDefinition object as request body. Then it creates a new apiDefinition under that adapter. \
   \
   **url** = ```POST /smt/adapterDefinition/{adapterId}/apiDefinition``` \
   \
   **request body** = ```{
  "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",  
  "sourceOperationId": "DeletePayee",
  "sourceAPI": {
          "category": "Banking",
          "operationId": "DeletePayee",
          "method": "DELETE",
          "path": "Payee"
  },
  "content": [{
    "name": "Removes a specific payee.",
    "operationId": "deletePayee",
         "sequenceId": "1",
           "dependsOn": [                 
           ],
           "endPoint": {
            "host": "api-gw-uat.fisglobal.com",
            "port": "",
            "path": "/api/bill-pay/payee-services/v1",
            "protocol": "https",
            "content-type": "application/json",
            "method": "delete"
        },
        "headerParams": [
          {
              "title": "contextToken",
              "required": "true",
              "in": "header"
          },
          {
              "title": "fe_id",
              "required":"true",
              "in": "header"
          },
          {
              "title": "locale",
              "required":"true",
              "in": "header"
          },
          {
              "title": "uuid",
              "required":"true",
              "in": "header"
          },
          {
              "title": "application_id",
              "required":"true",
              "in": "header"
          },
          {
              "title": "source_id",
              "required":"true",
              "in": "header"
          },
          {
              "title": "user_id",
              "required":"true",
              "in": "header"
          },
          {
              "title": "correlation_id",
              "required":"true",
              "in": "header"
          },
          {
              "title": "environment_id",
              "required":"true",
              "in": "header"
          }
      ],
      "requestParams": [
        {
            "title": "payeeId",
            "required":"true",
            "in": "path"
        }
    ],
    "responseParams": [],
     "errorCodes":[ 
 {
   "code":"400/401/404/500 etc",
   "message":"System failure"
 }
],
    "hostProfiles":[{
         "name":"FIS",
         "type":"URL",
         "url":"",
         "authentication":{"type":"oauth2"},
         "host":"https://api-gw-uat.fisglobal.com",
        "security": [{
                            "type": "internal"
                    }]
         }]
} ``` \
\
 **response** = ```{
  "_id": "5fc0ecfbd06ee52130e1ac07",
  "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
  "apiDefinitionId": "4139d772-9c71-4fbe-9c1c-df4087be6fab",
  "sourceOperationId": "DeletePayee",
  "sourceAPI": {
    "category": "Banking",
    "operationId": "DeletePayee",
    "method": "DELETE",
    "path": "Payee"
  },
  "content": [
    {
      "_id": "5fc0ecfbd06ee52130e1ac08",
      "name": "Removes a specific payee.",
      "operationId": "deletePayee",
      "sequenceId": "1",
      "dependsOn": [],
      "endPoint": {
        "host": "api-gw-uat.fisglobal.com",
        "port": "",
        "path": "/api/bill-pay/payee-services/v1",
        "protocol": "https",
        "content-type": "application/json",
        "method": "delete"
      },
      "headerParams": [
        {
          "_id": "5fc0ecfbd06ee52130e1ac09",
          "title": "contextToken",
          "required": "true",
          "in": "header"
        },
        {
          "_id": "5fc0ecfbd06ee52130e1ac0a",
          "title": "fe_id",
          "required": "true",
          "in": "header"
        },
        {
          "_id": "5fc0ecfbd06ee52130e1ac0b",
          "title": "locale",
          "required": "true",
          "in": "header"
        },
        {
          "_id": "5fc0ecfbd06ee52130e1ac0c",
          "title": "uuid",
          "required": "true",
          "in": "header"
        },
        {
          "_id": "5fc0ecfbd06ee52130e1ac0d",
          "title": "application_id",
          "required": "true",
          "in": "header"
        },
        {
          "_id": "5fc0ecfbd06ee52130e1ac0e",
          "title": "source_id",
          "required": "true",
          "in": "header"
        },
        {
          "_id": "5fc0ecfbd06ee52130e1ac0f",
          "title": "user_id",
          "required": "true",
          "in": "header"
        },
        {
          "_id": "5fc0ecfbd06ee52130e1ac10",
          "title": "correlation_id",
          "required": "true",
          "in": "header"
        },
        {
          "_id": "5fc0ecfbd06ee52130e1ac11",
          "title": "environment_id",
          "required": "true",
          "in": "header"
        }
      ],
      "requestParams": [
        {
          "_id": "5fc0ecfbd06ee52130e1ac12",
          "title": "payeeId",
          "required": "true",
          "in": "path"
        }
      ],
      "responseParams": [],
      "errorCodes": [
        {
          "code": "400/401/404/500 etc",
          "message": "System failure"
        }
      ],
      "hostProfiles": [
        {
          "_id": "5fc0ecfbd06ee52130e1ac13",
          "name": "FIS",
          "type": "URL",
          "url": "",
          "authentication": {
            "type": "oauth2"
          },
          "host": "https://api-gw-uat.fisglobal.com",
          "security": [
            {
              "_id": "5fc0ecfbd06ee52130e1ac14",
              "type": "internal"
            }
          ]
        }
      ],
      "schemaId": "34f1f4d6-0b14-4922-ac76-fd765e6244c5"
    }
  ],
  "__v": 0
}```

### Get apiDefinition
> It requires `adapterId` and `apiDefinitionId` as path param and returns apiDefinition.\
 \
 **url** = ```GET /smt/adapterDefinition/{adapterId}/apiDefinition/{apiDefinitionId}```\
 \
 **response** = ```{
    "sourceAPI": {
        "category": "Banking",
        "operationId": "DeletePayee",
        "method": "DELETE",
        "path": "Payee"
    },
    "_id": "5fbfd36a0bbeed2aa8a24680",
    "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
    "apiDefinitionId": "72068c90-02ae-4fce-845f-771c05356551",
    "sourceOperationId": "DeletePayee",
        "mappings":{},
    "content": [
        {
            "endPoint": {
                "host": "api-gw-uat.fisglobal.com",
                "port": "",
                "path": "/api/bill-pay/payee-services/v1",
                "protocol": "https",
                "content-type": "application/json",
                "method": "delete"
            },
            "dependsOn": [],
            "headerParams": [
                {
                    "_id": "5fbfd36a0bbeed2aa8a24682",
                    "title": "contextToken",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24683",
                    "title": "fe_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24684",
                    "title": "locale",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24685",
                    "title": "uuid",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24686",
                    "title": "application_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24687",
                    "title": "source_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24688",
                    "title": "user_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24689",
                    "title": "correlation_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a2468a",
                    "title": "environment_id",
                    "required": "true",
                    "in": "header"
                }
            ],
            "requestParams": [
                {
                    "_id": "5fbfd36a0bbeed2aa8a2468b",
                    "title": "payeeId",
                    "required": "true",
                    "in": "path"
                }
            ],
            "responseParams": [],
"errorCodes":[ 
 {
   "code":"400/401/404/500 etc",
   "message":"System failure"
 }
],
            "hostInfo": [],
            "_id": "5fbfd36a0bbeed2aa8a24681",
            "name": "Removes a specific payee.",
            "operationId": "deletePayee",
            "sequenceId": "1"
        }
    ],
    "__v": 0
} ```

### Update apiDefinition
> It requires `adapterId` and `apiDefinitionId` as path param and updated fields as request body and updates apiDefinition with new changes.\
\
 **url** = ```PUT /smt/adapterDefinition/{adapterId}/apiDefinition/{apiDefinitionId}```\
 \
 **request body** = ```{
  "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
  "sourceOperationId": "DeletePayee",
  "sourceAPI": {
    "category": "Banking",
    "operationId": "DeletePayee",
    "method": "DELETE",
    "path": "Payee"
  },
  "content": [
    {
      "name": "Removes a specific payee.",
      "operationId": "deletePayee",
      "sequenceId": "1",
      "dependsOn": [],
      "endPoint": {
        "host": "api-gw-uat.fisglobal.com",
        "port": "",
        "path": "/api/bill-pay/payee-services/v1",
        "protocol": "https",
        "content-type": "application/json",
        "method": "delete"
      },
      "headerParams": [
        {
          "title": "contextToken",
          "required": "true",
          "in": "header"
        },
        {
          "title": "fe_id",
          "required": "true",
          "in": "header"
        },
        {
          "title": "locale",
          "required": "true",
          "in": "header"
        },
        {
          "title": "uuid",
          "required": "true",
          "in": "header"
        },
        {
          "title": "application_id",
          "required": "true",
          "in": "header"
        },
        {
          "title": "source_id",
          "required": "true",
          "in": "header"
        },
        {
          "title": "user_id",
          "required": "true",
          "in": "header"
        },
        {
          "title": "correlation_id",
          "required": "true",
          "in": "header"
        },
        {
          "title": "environment_id",
          "required": "true",
          "in": "header"
        }
      ],
      "requestParams": [
        {
          "title": "payeeId",
          "required": "true",
          "in": "path"
        }
      ],
      "responseParams": [],
      "errorCodes": [
        {
          "code": "400/401/404/500 etc",
          "message": "System failure"
        }
      ],
      "hostProfiles": [
        {
          "name": "FIS",
          "type": "URL",
          "url": "",
          "authentication": {
            "type": "oauth2"
          },
          "host": "https://api-gw-uat.fisglobal.com",
          "security": [
            {
              "type": "internal"
            }
          ]
        }
      ]
    }
  ]
}```\
\
**response** = ```{
  "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
  "sourceOperationId": "DeletePayee",
  "sourceAPI": {
    "category": "Banking",
    "operationId": "DeletePayee",
    "method": "DELETE",
    "path": "Payee"
  },
  "content": [
    {
      "name": "Removes a specific payee.",
      "operationId": "deletePayee",
      "sequenceId": "1",
      "dependsOn": [],
      "endPoint": {
        "host": "api-gw-uat.fisglobal.com",
        "port": "",
        "path": "/api/bill-pay/payee-services/v1",
        "protocol": "https",
        "content-type": "application/json",
        "method": "delete"
      },
      "headerParams": [
        {
          "title": "contextToken",
          "required": "true",
          "in": "header"
        },
        {
          "title": "fe_id",
          "required": "true",
          "in": "header"
        },
        {
          "title": "locale",
          "required": "true",
          "in": "header"
        },
        {
          "title": "uuid",
          "required": "true",
          "in": "header"
        },
        {
          "title": "application_id",
          "required": "true",
          "in": "header"
        },
        {
          "title": "source_id",
          "required": "true",
          "in": "header"
        },
        {
          "title": "user_id",
          "required": "true",
          "in": "header"
        },
        {
          "title": "correlation_id",
          "required": "true",
          "in": "header"
        },
        {
          "title": "environment_id",
          "required": "true",
          "in": "header"
        }
      ],
      "requestParams": [
        {
          "title": "payeeId",
          "required": "true",
          "in": "path"
        }
      ],
      "responseParams": [],
      "errorCodes": [
        {
          "code": "400/401/404/500 etc",
          "message": "System failure"
        }
      ],
      "hostProfiles": [
        {
          "name": "FIS",
          "type": "URL",
          "url": "",
          "authentication": {
            "type": "oauth2"
          },
          "host": "https://api-gw-uat.fisglobal.com",
          "security": [
            {
              "type": "internal"
            }
          ]
        }
      ]
    }
  ]
}```

### Delete apiDefinition
> It requires `adapterId` and `apiDefinitionId` as path param and deletes the apiDefinition.\
\
**url** = ```DELETE /smt/adapterDefinition/{adapterId}/apiDefinition/{apiDefinitionId}```\
\
**response** = ```{ msg: 'API definition deleted successfully.' }```

### Get apiDefinition By OperationId
> It requires `adapterId` and `operationId` and returns api definition.\
\
**url** = ```GET /smt/adapterDefinition/{adapterId}/operation/{operationId}```\
\
**response** = ```{
    "sourceAPI": {
        "category": "Banking",
        "operationId": "DeletePayee",
        "method": "DELETE",
        "path": "Payee"
    },
    "_id": "5fbfd36a0bbeed2aa8a24680",
    "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
    "apiDefinitionId": "72068c90-02ae-4fce-845f-771c05356551",
    "sourceOperationId": "DeletePayee",
    "mappings":{},
    "content": [
        {
            "endPoint": {
                "host": "api-gw-uat.fisglobal.com",
                "port": "",
                "path": "/api/bill-pay/payee-services/v1",
                "protocol": "https",
                "content-type": "application/json",
                "method": "delete"
            },
            "dependsOn": [],
            "headerParams": [
                {
                    "_id": "5fbfd36a0bbeed2aa8a24682",
                    "title": "contextToken",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24683",
                    "title": "fe_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24684",
                    "title": "locale",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24685",
                    "title": "uuid",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24686",
                    "title": "application_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24687",
                    "title": "source_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24688",
                    "title": "user_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24689",
                    "title": "correlation_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a2468a",
                    "title": "environment_id",
                    "required": "true",
                    "in": "header"
                }
            ],
            "requestParams": [
                {
                    "_id": "5fbfd36a0bbeed2aa8a2468b",
                    "title": "payeeId",
                    "required": "true",
                    "in": "path"
                }
            ],
            "responseParams": [],
            "hostInfo": [],
            "_id": "5fbfd36a0bbeed2aa8a24681",
            "name": "Removes a specific payee.",
            "operationId": "deletePayee",
            "sequenceId": "1"
        }
    ],
    "__v": 0
}```

### Get apiDefinition By Source Operation Id
> It requires `operationId` as path param and return apiDefinition. \
\
**url** = ```GET /smt/apiDefinition/operation/{operationId}``` \
\
**response** = ```{
    "sourceAPI": {
        "category": "Banking",
        "operationId": "DeletePayee",
        "method": "DELETE",
        "path": "Payee"
    },
    "_id": "5fbfd36a0bbeed2aa8a24680",
    "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
    "apiDefinitionId": "72068c90-02ae-4fce-845f-771c05356551",
    "sourceOperationId": "DeletePayee",
    "mappings":{},
    "content": [
        {
            "endPoint": {
                "host": "api-gw-uat.fisglobal.com",
                "port": "",
                "path": "/api/bill-pay/payee-services/v1",
                "protocol": "https",
                "content-type": "application/json",
                "method": "delete"
            },
            "dependsOn": [],
            "headerParams": [
                {
                    "_id": "5fbfd36a0bbeed2aa8a24682",
                    "title": "contextToken",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24683",
                    "title": "fe_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24684",
                    "title": "locale",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24685",
                    "title": "uuid",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24686",
                    "title": "application_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24687",
                    "title": "source_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24688",
                    "title": "user_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a24689",
                    "title": "correlation_id",
                    "required": "true",
                    "in": "header"
                },
                {
                    "_id": "5fbfd36a0bbeed2aa8a2468a",
                    "title": "environment_id",
                    "required": "true",
                    "in": "header"
                }
            ],
            "requestParams": [
                {
                    "_id": "5fbfd36a0bbeed2aa8a2468b",
                    "title": "payeeId",
                    "required": "true",
                    "in": "path"
                }
            ],
            "responseParams": [],
"errorCodes":[ 
 {
   "code":"400/401/404/500 etc",
   "message":"System failure"
 }
],
            "hostInfo": [],
            "_id": "5fbfd36a0bbeed2aa8a24681",
            "name": "Removes a specific payee.",
            "operationId": "deletePayee",
            "sequenceId": "1"
        }
    ],
    "__v": 0
}```

### Create Mapping
> It requires `adapterId` and `apiDefinitionId` as path param and mapping object as request body then it creates mappings for that apiDefinition. \
\
**url** = ```POST /smt/adapterDefinition/{adapterId}/apiDefinition/{apiDefinitionId}/mapping``` \
\
**request body** = ```{
  "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
  "apiDefinitionId": "4139d772-9c71-4fbe-9c1c-df4087be6fab", 
  "sourceOperationId":"DeletePayee"
  "targetAPI": [
    {
      "schemaId": "34f1f4d6-0b14-4922-ac76-fd765e6244c5",
      "operationId": "DeletePayee",
      "path": "",
        "headerParams": [
          {
            "key": "organization_id",
            "type": "constant",
            "value": "K001"
          }
        ],
        "requestParams": [
          {
            "key": "PayeeId",
            "type": "directMap",
            "value": "{{sourceAPI.DeletePayee.requestParams.PayeeId}}"
          }
        ]      
    }
  ],
  "sourceAPI": {
    "category": "Banking",
    "operationId": "DeletePayee",
    "method": "DELETE",
    "path": "Payee",
   "responseParams":[{}]
  }
}```\
\
**response** = ```{
    "sourceAPI": {
            "responseParams": [],
            "headerParams": [],
        "category": "Banking",
        "operationId": "DeletePayee",
        "method": "DELETE",
        "path": "Payee"
    },
    "_id": "5fc105e002e0ea43f0a96294",
    "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
    "apiDefinitionId": "4139d772-9c71-4fbe-9c1c-df4087be6fab",
    "sourceOperationId":"DeletePayee",
    "mappingId": "6b3448e6-a625-4ccc-834c-60bb5904d606",
    "targetAPI": [
        {
            "_id": "5fc105e002e0ea43f0a96295",
            "schemaId": "34f1f4d6-0b14-4922-ac76-fd765e6244c5",
            "operationId": "DeletePayee",
            "path": "",
                "headerParams": [
                    {
                        "_id": "5fc105e002e0ea43f0a96296",
                        "key": "organization_id",
                        "type": "constant",
                        "value": "K001"
                    }
                ],
                "requestParams": [
                    {
                        "_id": "5fc105e002e0ea43f0a96297",
                        "key": "PayeeId",
                        "type": "directMap",
                        "value": "{{sourceAPI.DeletePayee.requestParams.PayeeId}}"
                    }
                ],
                "responseParams": [],
"errorCodes":[{
   "code":"400/401/404/500 etc",
   "message":"System failure"
 }],
 }],"__v": 0
}```

### Update Mapping
> It requires `adapterId`, `apiDefinitionId` and `mappingId` as path param and request body and it updates the mapping.\
\
**url** = ```PUT /smt/adapterDefinition/{adapterId}/apiDefinition/{apiDefinitionId}/mapping/{mappingId}```\
\
**request body** = ```{
  "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
  "apiDefinitionId": "4139d772-9c71-4fbe-9c1c-df4087be6fab",
  "sourceOperationId": "DeletePayee",
  "targetAPI": [
    {
      "schemaId": "34f1f4d6-0b14-4922-ac76-fd765e6244c5",
      "operationId": "DeletePayee",
      "path": "",
      "headerParams": [
        {
          "key": "organization_id",
          "type": "constant",
          "value": "K001"
        }
      ],
      "requestParams": [
        {
          "key": "PayeeId",
          "type": "directMap",
          "value": "{{sourceAPI.DeletePayee.requestParams.PayeeId}}"
        }
      ]
    }
  ],
  "sourceAPI": {
    "category": "Banking",
    "operationId": "DeletePayee",
    "method": "DELETE",
    "path": "Payee",
    "responseParameters": [
      {
        "key": "",
        "type": "",
        "value": "",
        "targetApiIndex": "1"
      }
    ]
  }
}```\
\
**response** = ```{
  "adapterId": "bbbfc816-1558-4478-afe6-cf9593186899",
  "apiDefinitionId": "4139d772-9c71-4fbe-9c1c-df4087be6fab",
  "sourceOperationId": "DeletePayee",
  "targetAPI": [
    {
      "schemaId": "34f1f4d6-0b14-4922-ac76-fd765e6244c5",
      "operationId": "DeletePayee",
      "path": "",
      "headerParams": [
        {
          "key": "organization_id",
          "type": "constant",
          "value": "K001"
        }
      ],
      "requestParams": [
        {
          "key": "PayeeId",
          "type": "directMap",
          "value": "{{sourceAPI.DeletePayee.requestParams.PayeeId}}"
        }
      ]
    }
  ],
  "sourceAPI": {
    "category": "Banking",
    "operationId": "DeletePayee",
    "method": "DELETE",
    "path": "Payee",
    "responseParameters": [
      {
        "key": "",
        "type": "",
        "value": "",
        "targetApiIndex": "1"
      }
    ]
  }
}```

### Delete Mapping
> It requires `adapterId`, `apiDefinitionId` and `mappingId` and deletes the mappings.\
\
**url** = ```DELETE /smt/adapterDefinition/{adapterId}/apiDefinition/{apiDefinitionId}/mapping/{mappingId}```\
\
**response** = ```{ msg: "Mapping configuration deleted successfully." }```

### Publish Adapter
> It requires array of objects as request body and changes the status of the adapter from `in development` mode to `published` mode and updates the `version` as well.\
\
**url** = ```POST /smt/publish```\
\
**request body** = ```[{"adapterId":"bfgh3456"}, {"adapterId":"bf6yud56"}, {"adapterId":"bfgdd66"}]```\
\
**response** = ```{ msg: 'adapter has been successfully published.' }```

### Upgrade Adapter
> After an adapter gets published, no changes can be made to the adapter. To make new changes, adapter needs to be upgraded first. The upgrade api creates a 
new copy of the `published` adapter and sets it to `in development` mode. So that new changes could be made to the `in development` copy and the `published` copy 
could be kept safe.\
\
**url** = ```POST /smt/upgrade```\
\
**request body** = ```{"adapterId":"bfgdd66"}```\
\
**response** = ```{ msg: 'adapter is set to in development.' }```