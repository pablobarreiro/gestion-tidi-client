const baseUri = process.env.REACT_APP_CORS_URL ?? 'http://localhost:3000/'

// Project routes
export const getProjectRoute = (projectId) => `${baseUri}api/projects/single/${projectId}`
export const getAdminProjectRoute = (projectId) => `${baseUri}api/projects/admin/single/${projectId}`
export const getAllProjectsRoute = () => `${baseUri}api/projects/all`
export const getAllAdminProjectsRoute = () => `${baseUri}api/projects/admin/all`
export const createProjectRoute = () => `${baseUri}api/projects/project`
export const editProjectRoute = (projectId) => `${baseUri}api/projects/single/${projectId}`

// Carpentry routes
export const carpentryOutcomes = (projectId) => `${baseUri}api/carpentry/${projectId}/outcomes`
export const carpentryUpdateTotals = (projectId) => `${baseUri}api/carpentry/${projectId}/totals`
export const carpentryNewOutcome = () => `${baseUri}api/carpentry/outcome`
export const carpentryDeleteOutcome = (outcomeId) => `${baseUri}api/carpentry/outcome/${outcomeId}`

// Marble routes
export const marbleOutcomes = (projectId) => `${baseUri}api/marble/${projectId}/outcomes`
export const marbleUpdateTotals = (projectId) => `${baseUri}api/marble/${projectId}/totals`
export const marbleNewOutcome = () => `${baseUri}api/marble/outcome`
export const marbleDeleteOutcome = (outcomeId) => `${baseUri}api/marble/outcome/${outcomeId}`

// IronWorking routes
export const ironWorkingOutcomes = (projectId) => `${baseUri}api/ironWorking/${projectId}/outcomes`
export const ironWorkingUpdateTotals = (projectId) => `${baseUri}api/ironWorking/${projectId}/totals`
export const ironWorkingNewInvoice = () => `${baseUri}api/ironWorking/invoice`
export const ironWorkingNewInvoices = () => `${baseUri}api/ironWorking/invoices`
export const ironWorkingPayInvoices = () => `${baseUri}api/ironWorking/invoices`
export const ironWorkingDeleteOutcome = (outcomeId) => `${baseUri}api/ironWorking/outcome/${outcomeId}`

// Lights routes
export const lightOutcomes = (projectId) => `${baseUri}api/light/${projectId}/outcomes`
export const lightUpdateTotals = (projectId) => `${baseUri}api/light/${projectId}/totals`
export const lightNewInvoice = () => `${baseUri}api/light/invoice`
export const lightNewInvoices = () => `${baseUri}api/light/invoices`
export const lightPayInvoices = () => `${baseUri}api/light/invoices`
export const lightDeleteOutcome = (outcomeId) => `${baseUri}api/light/outcome/${outcomeId}`

// Income routes
export const getPayments = (projectId) => `${baseUri}api/income/${projectId}/payments`
export const editIncomeTotals = (projectId) => `${baseUri}api/income/${projectId}/totals`
export const newPayment = () => `${baseUri}api/income/payment`
export const deletePayment = (paymentId) => `${baseUri}api/income/${paymentId}`

// User routes
export const loginRoute = () => `${baseUri}api/user/login`
export const createUserRoute = () => `${baseUri}api/user/newUser`
export const logoutRoute = () => `${baseUri}api/user/logout`
export const persistRoute = () => `${baseUri}api/user/me`
export const changeUsername = () => `${baseUri}api/user/username`
export const changePassword = () => `${baseUri}api/user/password`

//Edit generals routes
export const salesmanList = () => `${baseUri}api/generals/salesman`
export const branchList = () => `${baseUri}api/generals/branch`
export const stateList = () => `${baseUri}api/generals/internalState`
export const deleteSalesman = (id) => `${baseUri}api/generals/salesman/${id}`
export const deleteBranch = (id) => `${baseUri}api/generals/branch/${id}`
export const deleteState = (id) => `${baseUri}api/generals/internalState/${id}`

//Budget routes
export const getBudgetRoute = (projectId) => `${baseUri}api/budget/${projectId}`
export const budgetUpdateTotals = (projectId) => `${baseUri}api/budget/${projectId}`