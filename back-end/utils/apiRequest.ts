
export async function apiRequest(action:any, collectionName:any, options:any) {
    const result = await fetch(
      `https://ap-southeast-1.aws.data.mongodb-api.com/app/data-zftbv/endpoint/data/v1/action/${action}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "KmPNx65ZjwnKO0RUINq3Bhtk9xMJUDY76vZAZZUxpcI1aB6YPfHhulN29dLTw9hI",
        },
        body: JSON.stringify({
          dataSource: "selfieapp",
          database: "db", 
          collection: collectionName,
          ...options,
        }),
      }
    ).then((res) => res.json());
  
    return result;
  }