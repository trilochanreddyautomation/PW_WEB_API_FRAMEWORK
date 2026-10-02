import { test, expect, request, APIResponse } from '@playwright/test';

let AUTH_TOKEN = {
    Authorization: 'Bearer e179ecdde06cc7613270d372c5ff1ad0e6d45fc275284d40c63ae7c99198af0e'
}

test('get all users api test', async ({ request }) => {

    let response: APIResponse = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });

    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);

});

test('create a user api', async ({ request }) => {

    //User JS Object:
    let userData = {
        name: 'Trilochan',
        email: `Trilochanautomation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    }
    let response = await request.post('https://gorest.co.in/public/v2/users',
        {
            headers: AUTH_TOKEN,
            data: userData
        }
    );
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());//201
    console.log(response.statusText());//Created

    expect(response.status()).toBe(201);

});


test('update a user api', async ({ request }) => {

    //User JS Object:
    let userData = {
        name: 'Trilochan Reddy',
        email: 'Trilochanautomation@open.com',
        gender: 'male',
        status: 'inactive'
    }
    let response = await request.put('https://gorest.co.in/public/v2/users/8617620',
        {
            headers: AUTH_TOKEN,
            data: userData
        }
    );
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());//200
    console.log(response.statusText());//OK

    expect(response.status()).toBe(200);

});


test('delete a user api', async ({ request }) => {

    let response = await request.delete('https://gorest.co.in/public/v2/users/8617624',
        {
            headers: AUTH_TOKEN
        }
    );

    console.log(response.status());//204
    console.log(response.statusText());//No Content

    expect(response.status()).toBe(204);

});