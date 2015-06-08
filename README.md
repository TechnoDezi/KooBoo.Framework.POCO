# KooBoo Framework POCO Generator
KooBoo.Framework POCO Generator. Generates c# entity classes and stored procedures based on MSSql tables

The purpose of this project is to generate poco entity classes and stored procs that runs on the KooBoo enterprise library framework that can be added via NuGet.

The KooBoo framework is what drives the KooBoo Shop SA ecommerce platform and is a simplified framework used to manage data on large enterprise systems without using Entity Framework.

**Download the latest POCO Generator release from:**
[https://github.com/TechnoDezi/KooBoo.Framework.POCO/releases](https://github.com/TechnoDezi/KooBoo.Framework.POCO/releases)

**KooBoo Enterprise Framework**
You can add the KooBoo.Framework refrence to your project from NuGet.
[https://www.nuget.org/packages/KooBoo.Framework/](https://www.nuget.org/packages/KooBoo.Framework/)

    PM> Install-Package KooBoo.Framework

### Features ###
- Generate c# entity classes
- Generate crud stored procedures
- Transient fault handling via KooBoo.Framework
- Error logging support build in (Need to add logging source).
- Generates interfaces for dependency injection design pattern
- Generated classes supports crud operations: GetDetails, GetListSearch, AddUpdate and delete
- Transaction handling using entity chaining via KooBoo.Framework
- Custom templates. Edit all templates to suit your own needs