ValidatedResource {
  '$modelManager':
   ModelManager {
     modelFiles:
      { 'org.hyperledger.composer.system': [Object],
        'org.factory': [Object] },
     factory: Factory { modelManager: [Circular] },
     serializer:
      Serializer {
        factory: [Object],
        modelManager: [Circular],
        defaultOptions: [Object] } },
  '$classDeclaration':
   EventDeclaration {
     ast:
      { type: 'EventDeclaration',
        id: [Object],
        classExtension: null,
        body: [Object],
        idField: null,
        abstract: null,
        decorators: [],
        location: [Object] },
     modelFile:
      ModelFile {
        modelManager: [Object],
        external: false,
        declarations: [Array],
        imports: [Array],
        importUriMap: {},
        fileName: 'models/org.factory.cto',
        definitions: '/**\n * Write your model definitions here\n */\n\nnamespace org.factory\n\nasset Device identified by DeviceID{\n  o String DeviceID\n  --> DeviceManager manager\n  o String name\n}\n\nparticipant Department identified by DepartmentID {\n  o String DepartmentID\n  o String name\n}\n\nparticipant SecurityManager identified by EmployeeID {\n  o String EmployeeID\n  --> Department departmentID\n  o String name\n}\n\nparticipant DeviceManager identified by EmployeeID {\n  o String EmployeeID\n  --> Department departmentID\n  o String name\n}\n\nevent deviceEnrolled {\n  --> Device device\n}\n\ntransaction moveDeviceLocation {\n  --> Device device\n  --> Department department\n}\n\nevent deviceLocationMoved {\n  --> Device device\n  --> Department department\n}\n\ntransaction refreshDevice {\n}\n\nevent refreshRequest {\n}\n\ntransaction changeDeviceManager {\n  --> Device device\n  --> DeviceManager manager\n}',
        ast: [Object],
        namespace: 'org.factory',
        systemModelFile: false },
     decorators: [],
     name: 'refreshRequest',
     properties: [],
     superType: 'Event',
     superTypeDeclaration:
      EventDeclaration {
        ast: [Object],
        modelFile: [Object],
        decorators: [Array],
        name: 'Event',
        properties: [Array],
        superType: null,
        superTypeDeclaration: null,
        idField: 'eventId',
        abstract: true,
        fqn: 'org.hyperledger.composer.system.Event' },
     idField: null,
     abstract: false,
     fqn: 'org.factory.refreshRequest' },
  '$namespace': 'org.factory',
  '$type': 'refreshRequest',
  '$identifier': 'f851d4317454858ec4c317a6bd55262d53e8b43c8fdf68f6da75ffdcda6ef405#0',
  '$validator': ResourceValidator { options: {} },
  eventId: 'f851d4317454858ec4c317a6bd55262d53e8b43c8fdf68f6da75ffdcda6ef405#0',
  timestamp: 2018-05-17T16:12:12.984Z }