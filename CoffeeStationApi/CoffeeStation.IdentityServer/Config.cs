// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace CoffeeStation.IdentityServer
{
    public static class Config
    {
        // Api Resources
        public static IEnumerable<ApiResource> ApiResources =>
            new ApiResource[]
            {
                new ApiResource("ResourceCatalog") {Scopes = { "CatalogFullPermission", "CatalogReadPermission" }},
                new ApiResource("ResourceDiscount") { Scopes = { "DiscountFullPermission" } },
                new ApiResource("ResourceOrder") { Scopes = { "OrderFullPermission" } },
                new ApiResource("ResourceBasket") { Scopes = { "BasketFullPermission" } },
                new ApiResource("ResourceOcelot") { Scopes = { "OcelotFullPermission" } },
                new ApiResource(IdentityServerConstants.LocalApi.ScopeName),
                
            };
        // Identity Resources 
        public static IEnumerable<IdentityResource> IdentityResources =>
                   new IdentityResource[]
                   {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
                new IdentityResource{
                    Name = "roles",
                    DisplayName = "User Roles",
                    UserClaims = { "role" }
                }
                   };

        // Api Scopes
        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("CatalogFullPermission", "Full authority for catalog operations"),
                new ApiScope("CatalogReadPermission", "Reading authority for catalog operations"),
                new ApiScope("DiscountFullPermission", "Full authority for discount operations"),
                new ApiScope("OrderFullPermission", "Full authority for order operations"),
                new ApiScope("BasketFullPermission", "Full authority for basket operations"),
                new ApiScope("OcelotFullPermission", "Full authority for ocelot operations"),
                new ApiScope(IdentityServerConstants.LocalApi.ScopeName),
            };
        
        // Clients
        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                //Visitor
                new Client
                {
                    ClientId = "CoffeeStationVisitorId",
                    ClientName = "Coffee Station Visitor User",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = { new Secret("coffeestationsecret".Sha256()) },
                    AllowedScopes = { "CatalogReadPermission", "CatalogFullPermission" , "OcelotFullPermission" },
                    AccessTokenLifetime = int.MaxValue
                },
                //User
                new Client
                {
                    ClientId = "CoffeeStationUserId",
                    ClientName = "Coffee Station Auth User",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    ClientSecrets = { new Secret("coffeestationsecret".Sha256()) },
                    AllowedScopes = 
                    { 
                        "CatalogReadPermission",
                        "CatalogFullPermission",
                        "OcelotFullPermission",
                        "BasketFullPermission",
                        "DiscountFullPermission",
                        "OrderFullPermission",
                        "roles",
                         },
                    AccessTokenLifetime = int.MaxValue
                },
                //Admin
                new Client
                {
                    ClientId = "CoffeeStationAdminId",
                    ClientName = "Coffee Station Admin User",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    ClientSecrets = { new Secret("coffeestationsecret".Sha256()) },
                    AllowedScopes =
                    {
                        "CatalogReadPermission",
                        "CatalogFullPermission",
                        "DiscountFullPermission",
                        "OrderFullPermission",
                        "BasketFullPermission",
                        "OcelotFullPermission",
                        "roles",
                        IdentityServerConstants.LocalApi.ScopeName,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                    },
                    AccessTokenLifetime = int.MaxValue
                    ,
                },
            };
    }
}