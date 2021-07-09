There's only 1 admin allowed at any time, so, if id in req.session.adminId is equal to the only existing admin's id, in other words, the 
admin has successfully logged in, allow all mutation.

Logic is encapsulated in the isAuth middleware.