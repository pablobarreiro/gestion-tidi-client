const baseUri = process.env.REACT_APP_CORS_URL ?? 'http://localhost:3001/'

// Project routes
export const getProjectRoute = (projectNumber) => `${baseUri}api/projects/single/${projectNumber}`
export const createProjectRoute = () => `${baseUri}api/projects/project`
export const editProjectRoute = (projectNumber) => `${baseUri}api/projects/single/${projectNumber}`

// Carpentry routes
export const carpentryOutcomes = (projectNumber) => `${baseUri}api/carpentry/${projectNumber}/outcomes`
export const carpentryUpdateTotals = (projectNumber) => `${baseUri}api/carpentry/${projectNumber}/totals`
export const carpentryNewOutcome = () => `${baseUri}api/carpentry/outcome`

// Marble routes
export const marbleOutcomes = (projectNumber) => `${baseUri}api/marble/${projectNumber}/outcomes`
export const marbleUpdateTotals = (projectNumber) => `${baseUri}api/marble/${projectNumber}/totals`
export const marbleNewOutcome = () => `${baseUri}api/marble/outcome`

// IronWorking routes
export const ironWorkingOutcomes = (projectNumber) => `${baseUri}api/ironWorking/${projectNumber}/outcomes`
export const ironWorkingUpdateTotals = (projectNumber) => `${baseUri}api/ironWorking/${projectNumber}/totals`
export const ironWorkingNewInvoice = () => `${baseUri}api/ironWorking/invoice`
export const ironWorkingNewInvoices = () => `${baseUri}api/ironWorking/invoices`
export const ironWorkingPayInvoices = () => `${baseUri}api/ironWorking/invoices`

// Lights routes
export const lightOutcomes = (projectNumber) => `${baseUri}api/light/${projectNumber}/outcomes`
export const lightUpdateTotals = (projectNumber) => `${baseUri}api/light/${projectNumber}/totals`
export const lightNewInvoice = () => `${baseUri}api/light/invoice`
export const lightNewInvoices = () => `${baseUri}api/light/invoices`
export const lightPayInvoices = () => `${baseUri}api/light/invoices`

// User routes
export const loginRoute = () => `${baseUri}api/user/login`
export const createUserRoute = () => `${baseUri}api/user/newUser`
export const logoutRoute = () => `${baseUri}api/user/logout`
export const persistRoute = () => `${baseUri}api/user/me`
