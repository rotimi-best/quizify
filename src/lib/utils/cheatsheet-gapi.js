// @ts-nocheck

/**
 *  Sign in the user upon button click.
 */
const handleAuthClick = (event) => {
  gapi.auth2.getAuthInstance().signIn();
};

const updateSigninStatus = (isSignedIn) => {
  if (isSignedIn) {
    // Set the signed in user
    user = gapi.auth2.getAuthInstance().currentUser.je.Qt;
    isLoadingGapi = false;
    // list files if user is authenticated
    listFiles();
  } else {
    // prompt user to sign in
    handleAuthClick();
  }
};
const initClient = () => {
  // setIsLoadingGoogleDriveApi(true);
  console.log('init client', gapi);
  isLoadingGapi = true;
  gapi.client
    .init({
      apiKey: '',
      clientId: credentials.client_id,
      // clientSecret: credentials.client_secret,
      // redirectUris: credentials.redirect_uris[0],
      discoveryDocs: discoveryDocs,
      scope: scopes.join(', '),
    })
    .then(
      function (response) {
        console.log(response);
      },
      function (reason) {
        console.log('Error: ' + reason.result);
      }
    );
};

/**
 * List files.
 */
const listFiles = () => {
  isLoadingGapi = false;
  gapi.client.forms.body
    .get({
      formId,
    })
    .then(function (response) {
      console.log('response', response.body);
    });
};

function start() {
  gapi.client
    .init({
      // apiKey: '',
      clientId: credentials.client_id,
      discoveryDocs,
    })
    .then(function () {
      // Executes an API request, and returns a Promise.
      // The method name `language.translations.list` comes from the API discovery.
      // @ts-ignore
      console.log(' gapi.client.forms', gapi.client.forms.forms);
      return gapi.client.forms.forms.get({
        formId: '1sK1Zaw3-mAeim7Vj8R15Jr8KYZJML0VgUzt24SHu5To',
      });
    });
}
function startOAuth() {
  auth2 = gapi.auth2.init({
    client_id: credentials.client_id,
    scope: scopes.join(', '),
  });
  auth2.signIn();
}
function decodeJwtResponse(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}
const discoveryDocs = [
  'https://forms.googleapis.com/$discovery/rest?version=v1',
];
function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);

  console.log('responsePayload: ' + JSON.stringify(responsePayload));
  console.log('ID: ' + responsePayload.sub);
  console.log('Full Name: ' + responsePayload.name);
  console.log('Given Name: ' + responsePayload.given_name);
  console.log('Family Name: ' + responsePayload.family_name);
  console.log('Image URL: ' + responsePayload.picture);
  console.log('Email: ' + responsePayload.email);
}
google.accounts.id.initialize({
  client_id: credentials.client_id,
  callback: handleCredentialResponse,
});
// const parent = document.getElementById('google_btn');
// google.accounts.id.renderButton(parent, { theme: 'filled_blue' });
// google.accounts.id.prompt();
