import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5f89cd66"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=5f89cd66"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=e9d7300a"; const ReactDOM = __vite__cjsImport2_reactDom_client.__esModule ? __vite__cjsImport2_reactDom_client.default : __vite__cjsImport2_reactDom_client;
import App from "/src/App.jsx";
import LoginPage from "/src/pages/LoginPage.jsx";
import HomePage from "/src/pages/HomePage.jsx";
import HomePageUser from "/src/pages/HomePageUser.jsx?t=1712847784229";
import HomePageAdmin from "/src/pages/HomePageAdmin.jsx?t=1712849384070";
import FindHospital from "/src/pages/FindHospital.jsx?t=1712847239494";
import Schedule from "/src/pages/Schedule.jsx?t=1712849371949";
import DoctorManagement from "/src/pages/DoctorManagement.jsx?t=1712849272143";
import AppointmentManagement from "/src/pages/AppointmentManagement.jsx?t=1712848552223";
import AdminHospital from "/src/pages/AdminHospital.jsx?t=1712849339183";
import AdminDepartment from "/src/pages/AdminDepartment.jsx?t=1712849311973";
import UserHistory from "/src/pages/UserHistory.jsx?t=1712847715450";
import "/src/index.css?t=1712850000900";
import { path } from "/src/utils/constant.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "/node_modules/.vite/deps/react-router-dom.js?v=b77902e7";
import __vite__cjsImport18__materialTailwind_react from "/node_modules/.vite/deps/@material-tailwind_react.js?v=7c279741"; const ThemeProvider = __vite__cjsImport18__materialTailwind_react["ThemeProvider"];
const router = createBrowserRouter(
  createRoutesFromElements(
    /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV(Route, { path: path.LOGIN, element: /* @__PURE__ */ jsxDEV(LoginPage, {}, void 0, false, {
        fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
        lineNumber: 29,
        columnNumber: 41
      }, this) }, void 0, false, {
        fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
        lineNumber: 29,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { path: "/", element: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
        fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
        lineNumber: 31,
        columnNumber: 32
      }, this), children: [
        /* @__PURE__ */ jsxDEV(Route, { index: true, element: /* @__PURE__ */ jsxDEV(HomePage, {}, void 0, false, {
          fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
          lineNumber: 32,
          columnNumber: 38
        }, this) }, void 0, false, {
          fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
          lineNumber: 32,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/user", children: [
          /* @__PURE__ */ jsxDEV(Route, { index: true, element: /* @__PURE__ */ jsxDEV(HomePageUser, {}, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 34,
            columnNumber: 40
          }, this) }, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 34,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(Route, { path: ":user_id", element: /* @__PURE__ */ jsxDEV(HomePageUser, {}, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 35,
            columnNumber: 43
          }, this) }, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 35,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(Route, { path: "/user/:user_id/findHospital", element: /* @__PURE__ */ jsxDEV(FindHospital, {}, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 36,
            columnNumber: 62
          }, this) }, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 36,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(Route, { path: "/user/:user_id/history", element: /* @__PURE__ */ jsxDEV(UserHistory, {}, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 37,
            columnNumber: 57
          }, this) }, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 37,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
          lineNumber: 33,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/admin", children: [
          /* @__PURE__ */ jsxDEV(Route, { index: true, element: /* @__PURE__ */ jsxDEV(HomePageAdmin, {}, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 41,
            columnNumber: 40
          }, this) }, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 41,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(Route, { path: "/admin/hospital/:hospital_id/department", element: /* @__PURE__ */ jsxDEV(AdminDepartment, {}, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 42,
            columnNumber: 74
          }, this) }, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 42,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(Route, { path: "/admin/hospital/:hospital_id/department/:department_id/doctor", element: /* @__PURE__ */ jsxDEV(DoctorManagement, {}, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 43,
            columnNumber: 96
          }, this) }, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 43,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(Route, { path: "/admin/hospital/:hospital_id/department/:department_id/doctor/:doctor_id/schedule", element: /* @__PURE__ */ jsxDEV(Schedule, {}, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 44,
            columnNumber: 116
          }, this) }, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 44,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(Route, { path: "/admin/hospital/:hospital_id/department/:department_id/doctor/:doctor_id/appointment", element: /* @__PURE__ */ jsxDEV(AppointmentManagement, {}, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 45,
            columnNumber: 119
          }, this) }, void 0, false, {
            fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
            lineNumber: 45,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
          lineNumber: 40,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
        lineNumber: 31,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
      lineNumber: 28,
      columnNumber: 5
    }, this)
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(ThemeProvider, { children: /* @__PURE__ */ jsxDEV(RouterProvider, { router }, void 0, false, {
    fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
    lineNumber: 57,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
    lineNumber: 56,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "C:/Users/ngock/OneDrive/Desktop/BookingCare/client/src/main.jsx",
    lineNumber: 55,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,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QUFBLGlCQUFzSTtBQUFBLGFBTHhJO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFRQTtBQUFBLFdBakJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFrQkE7QUFBQSxTQXJCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBc0JBO0FBQUEsRUFDRjtBQUNGO0FBRUFwQixTQUFTcUIsV0FBV0MsU0FBU0MsZUFBZSxNQUFNLENBQUMsRUFBRUM7QUFBQUEsRUFDbkQsdUJBQUMsTUFBTSxZQUFOLEVBQ0MsaUNBQUMsaUJBQ0MsaUNBQUMsa0JBQWUsVUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUErQixLQURqQztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBRUEsS0FIRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSUE7QUFDRiIsIm5hbWVzIjpbIlJlYWN0IiwiUmVhY3RET00iLCJBcHAiLCJMb2dpblBhZ2UiLCJIb21lUGFnZSIsIkhvbWVQYWdlVXNlciIsIkhvbWVQYWdlQWRtaW4iLCJGaW5kSG9zcGl0YWwiLCJTY2hlZHVsZSIsIkRvY3Rvck1hbmFnZW1lbnQiLCJBcHBvaW50bWVudE1hbmFnZW1lbnQiLCJBZG1pbkhvc3BpdGFsIiwiQWRtaW5EZXBhcnRtZW50IiwiVXNlckhpc3RvcnkiLCJwYXRoIiwiY3JlYXRlQnJvd3NlclJvdXRlciIsImNyZWF0ZVJvdXRlc0Zyb21FbGVtZW50cyIsIlJvdXRlIiwiUm91dGVyUHJvdmlkZXIiLCJUaGVtZVByb3ZpZGVyIiwicm91dGVyIiwiTE9HSU4iLCJjcmVhdGVSb290IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlciJdLCJzb3VyY2VzIjpbIm1haW4uanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XHJcbmltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLmpzeFwiO1xyXG5pbXBvcnQgTG9naW5QYWdlIGZyb20gXCIuL3BhZ2VzL0xvZ2luUGFnZS5qc3hcIjtcclxuaW1wb3J0IEhvbWVQYWdlIGZyb20gXCIuL3BhZ2VzL0hvbWVQYWdlLmpzeFwiXHJcbmltcG9ydCBIb21lUGFnZVVzZXIgZnJvbSBcIi4vcGFnZXMvSG9tZVBhZ2VVc2VyLmpzeFwiXHJcbmltcG9ydCBIb21lUGFnZUFkbWluIGZyb20gXCIuL3BhZ2VzL0hvbWVQYWdlQWRtaW4uanN4XCJcclxuaW1wb3J0IEZpbmRIb3NwaXRhbCBmcm9tIFwiLi9wYWdlcy9GaW5kSG9zcGl0YWwuanN4XCJcclxuaW1wb3J0IFNjaGVkdWxlIGZyb20gXCIuL3BhZ2VzL1NjaGVkdWxlLmpzeFwiXHJcbmltcG9ydCBEb2N0b3JNYW5hZ2VtZW50IGZyb20gXCIuL3BhZ2VzL0RvY3Rvck1hbmFnZW1lbnQuanN4XCJcclxuaW1wb3J0IEFwcG9pbnRtZW50TWFuYWdlbWVudCBmcm9tIFwiLi9wYWdlcy9BcHBvaW50bWVudE1hbmFnZW1lbnQuanN4XCJcclxuaW1wb3J0IEFkbWluSG9zcGl0YWwgZnJvbSBcIi4vcGFnZXMvQWRtaW5Ib3NwaXRhbC5qc3hcIlxyXG5pbXBvcnQgQWRtaW5EZXBhcnRtZW50IGZyb20gXCIuL3BhZ2VzL0FkbWluRGVwYXJ0bWVudC5qc3hcIjtcclxuaW1wb3J0IFVzZXJIaXN0b3J5IGZyb20gXCIuL3BhZ2VzL1VzZXJIaXN0b3J5LmpzeFwiXHJcbmltcG9ydCBcIi4vaW5kZXguY3NzXCI7XHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi4vc3JjL3V0aWxzL2NvbnN0YW50LmpzXCI7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlQnJvd3NlclJvdXRlcixcclxuICBjcmVhdGVSb3V0ZXNGcm9tRWxlbWVudHMsXHJcbiAgUm91dGUsXHJcbiAgUm91dGVyUHJvdmlkZXIsXHJcbn0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCJAbWF0ZXJpYWwtdGFpbHdpbmQvcmVhY3RcIjtcclxuXHJcblxyXG5jb25zdCByb3V0ZXIgPSBjcmVhdGVCcm93c2VyUm91dGVyKFxyXG4gIGNyZWF0ZVJvdXRlc0Zyb21FbGVtZW50cyhcclxuICAgIDw+XHJcbiAgICAgIDxSb3V0ZSBwYXRoPXtwYXRoLkxPR0lOfSBlbGVtZW50PXs8TG9naW5QYWdlIC8+fSAvPlxyXG5cclxuICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgZWxlbWVudD17PEFwcCAvPn0+XHJcbiAgICAgICAgPFJvdXRlIGluZGV4PXt0cnVlfSBlbGVtZW50PXs8SG9tZVBhZ2UgLz59IC8+XHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCIvdXNlclwiID5cclxuICAgICAgICAgIDxSb3V0ZSBpbmRleD17dHJ1ZX0gZWxlbWVudD17PEhvbWVQYWdlVXNlciAvPn0+PC9Sb3V0ZT5cclxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOnVzZXJfaWRcIiBlbGVtZW50PXs8SG9tZVBhZ2VVc2VyIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCIvdXNlci86dXNlcl9pZC9maW5kSG9zcGl0YWxcIiBlbGVtZW50PXs8RmluZEhvc3BpdGFsIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCIvdXNlci86dXNlcl9pZC9oaXN0b3J5XCIgZWxlbWVudD17PFVzZXJIaXN0b3J5IC8+fSAvPlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgPC9Sb3V0ZT5cclxuICAgICAgICA8Um91dGUgcGF0aD1cIi9hZG1pblwiID5cclxuICAgICAgICAgIDxSb3V0ZSBpbmRleD17dHJ1ZX0gZWxlbWVudD17PEhvbWVQYWdlQWRtaW4gLz59PjwvUm91dGU+XHJcbiAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hZG1pbi9ob3NwaXRhbC86aG9zcGl0YWxfaWQvZGVwYXJ0bWVudFwiIGVsZW1lbnQ9ezxBZG1pbkRlcGFydG1lbnQgLz59IC8+XHJcbiAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hZG1pbi9ob3NwaXRhbC86aG9zcGl0YWxfaWQvZGVwYXJ0bWVudC86ZGVwYXJ0bWVudF9pZC9kb2N0b3JcIiBlbGVtZW50PXs8RG9jdG9yTWFuYWdlbWVudCAvPn0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2FkbWluL2hvc3BpdGFsLzpob3NwaXRhbF9pZC9kZXBhcnRtZW50LzpkZXBhcnRtZW50X2lkL2RvY3Rvci86ZG9jdG9yX2lkL3NjaGVkdWxlXCIgZWxlbWVudD17PFNjaGVkdWxlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCIvYWRtaW4vaG9zcGl0YWwvOmhvc3BpdGFsX2lkL2RlcGFydG1lbnQvOmRlcGFydG1lbnRfaWQvZG9jdG9yLzpkb2N0b3JfaWQvYXBwb2ludG1lbnRcIiBlbGVtZW50PXs8QXBwb2ludG1lbnRNYW5hZ2VtZW50IC8+fSAvPlxyXG4gICAgICAgICBcclxuICAgICAgICAgIFxyXG4gICAgICAgIDwvUm91dGU+XHJcbiAgICAgIDwvUm91dGU+XHJcbiAgICA8Lz4sXHJcbiAgKSxcclxuKTtcclxuXHJcblJlYWN0RE9NLmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpKS5yZW5kZXIoXHJcbiAgPFJlYWN0LlN0cmljdE1vZGU+XHJcbiAgICA8VGhlbWVQcm92aWRlcj5cclxuICAgICAgPFJvdXRlclByb3ZpZGVyIHJvdXRlcj17cm91dGVyfSAvPlxyXG4gICAgPC9UaGVtZVByb3ZpZGVyPlxyXG4gIDwvUmVhY3QuU3RyaWN0TW9kZT4sXHJcbik7Il0sImZpbGUiOiJDOi9Vc2Vycy9uZ29jay9PbmVEcml2ZS9EZXNrdG9wL0Jvb2tpbmdDYXJlL2NsaWVudC9zcmMvbWFpbi5qc3gifQ==