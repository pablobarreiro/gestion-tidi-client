const baseUri = process.env.REACT_APP_CORS_URL ?? 'http://localhost:3000/'

// Project routes
export const getProjectRoute = (projectId) => `${baseUri}api/projects/single/${projectId}`
export const getAllProjectsRoute = () => `${baseUri}api/projects/all`
export const createProjectRoute = () => `${baseUri}api/projects/project`
export const editProjectRoute = (projectId) => `${baseUri}api/projects/single/${projectId}`

// Carpentry routes
export const carpentryOutcomes = (projectId) => `${baseUri}api/carpentry/${projectId}/outcomes`
export const carpentryUpdateTotals = (projectId) => `${baseUri}api/carpentry/${projectId}/totals`
export const carpentryNewOutcome = () => `${baseUri}api/carpentry/outcome`

// Marble routes
export const marbleOutcomes = (projectId) => `${baseUri}api/marble/${projectId}/outcomes`
export const marbleUpdateTotals = (projectId) => `${baseUri}api/marble/${projectId}/totals`
export const marbleNewOutcome = () => `${baseUri}api/marble/outcome`

// IronWorking routes
export const ironWorkingOutcomes = (projectId) => `${baseUri}api/ironWorking/${projectId}/outcomes`
export const ironWorkingUpdateTotals = (projectId) => `${baseUri}api/ironWorking/${projectId}/totals`
export const ironWorkingNewInvoice = () => `${baseUri}api/ironWorking/invoice`
export const ironWorkingNewInvoices = () => `${baseUri}api/ironWorking/invoices`
export const ironWorkingPayInvoices = () => `${baseUri}api/ironWorking/invoices`

// Lights routes
export const lightOutcomes = (projectId) => `${baseUri}api/light/${projectId}/outcomes`
export const lightUpdateTotals = (projectId) => `${baseUri}api/light/${projectId}/totals`
export const lightNewInvoice = () => `${baseUri}api/light/invoice`
export const lightNewInvoices = () => `${baseUri}api/light/invoices`
export const lightPayInvoices = () => `${baseUri}api/light/invoices`

// User routes
export const loginRoute = () => `${baseUri}api/user/login`
export const createUserRoute = () => `${baseUri}api/user/newUser`
export const logoutRoute = () => `${baseUri}api/user/logout`
export const persistRoute = () => `${baseUri}api/user/me`
