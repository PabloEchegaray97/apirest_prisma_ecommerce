"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = exports.SystemType = exports.Status = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["CLIENT"] = "CLIENT";
})(UserRole || (exports.UserRole = UserRole = {}));
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["PAID"] = "PAID";
    Status["CANCELLED"] = "CANCELLED";
})(Status || (exports.Status = Status = {}));
var SystemType;
(function (SystemType) {
    SystemType["EU"] = "EU";
    SystemType["US"] = "US";
    SystemType["UK"] = "UK";
    SystemType["CM"] = "CM";
})(SystemType || (exports.SystemType = SystemType = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CREDIT_CARD"] = "CREDIT_CARD";
    PaymentMethod["DEBIT_CARD"] = "DEBIT_CARD";
    PaymentMethod["CASH"] = "CASH";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
