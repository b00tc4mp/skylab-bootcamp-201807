'use strict';

describe('safe_user_login', function () {

    beforeEach(function () {
    });

    it('should iterate and operate correctly', function() {

        expect(safeUser.login('admin','12345')).toBe("Login successful");
        
    });

    it('should iterate and operate correctly', function() {

        expect(safeUser.login('admin','')).toBe('Wrong credentials');
        
    });

});

describe('safe_user_change_password', function () {

    beforeEach(function () {
    });

    it('should iterate and operate correctly', function() {

        expect(safeUser.changePassword('admin','12345','54321')).toBe('New password changed');
        
    });

});

describe('safe_user_message', function () {

    beforeEach(function () {
    });

    it('should iterate and operate correctly', function() {

        expect(safeUser.message('admin','12345','hola que tal')).toBe("New message changed");
        
    });

});