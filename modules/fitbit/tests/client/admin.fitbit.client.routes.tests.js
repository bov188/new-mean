﻿(function () {
  'use strict';

  describe('FitBits Route Tests', function () {
    // Initialize global variables
    var $scope,
      FitBitsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _FitBitsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      FitBitsService = _FitBitsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('admin.fitbits');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/fitbits');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('admin.fitbits.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/fitbits/client/views/admin/list-fitbits.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          FitBitsAdminController,
          mockFitBit;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.fitbits.create');
          $templateCache.put('/modules/fitbits/client/views/admin/form-fitbit.client.view.html', '');

          // Create mock fitbit
          mockFitBit = new FitBitsService();

          // Initialize Controller
          FitBitsAdminController = $controller('FitBitsAdminController as vm', {
            $scope: $scope,
            fitbitResolve: mockFitBit
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.fitbitResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/fitbits/create');
        }));

        it('should attach an fitbit to the controller scope', function () {
          expect($scope.vm.fitbit._id).toBe(mockFitBit._id);
          expect($scope.vm.fitbit._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('/modules/fitbits/client/views/admin/form-fitbit.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          FitBitsAdminController,
          mockFitBit;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.fitbits.edit');
          $templateCache.put('/modules/fitbits/client/views/admin/form-fitbit.client.view.html', '');

          // Create mock fitbit
          mockFitBit = new FitBitsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An FitBit about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          FitBitsAdminController = $controller('FitBitsAdminController as vm', {
            $scope: $scope,
            fitbitResolve: mockFitBit
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:fitbitId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.fitbitResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            fitbitId: 1
          })).toEqual('/admin/fitbits/1/edit');
        }));

        it('should attach an fitbit to the controller scope', function () {
          expect($scope.vm.fitbit._id).toBe(mockFitBit._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('/modules/fitbits/client/views/admin/form-fitbit.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
