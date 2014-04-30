using System.Collections.Generic;
using System.Linq;
using BikeFit2.DataLayer;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace BikeFit2.Models
{
    public class IdentityManager
    {
        // Swap ApplicationRole for IdentityRole:
        RoleManager<IdentityRole> _roleManager = new RoleManager<IdentityRole>(
            new RoleStore<IdentityRole>(new BikeFitContext()));

        UserManager<IdentityUser> _userManager = new UserManager<IdentityUser>(
            new UserStore<IdentityUser>(new BikeFitContext()));

        BikeFitContext _db = new BikeFitContext();


        public bool RoleExists(string name)
        {
            return _roleManager.RoleExists(name);
        }


        public bool CreateRole(string name)
        {
            // Swap ApplicationRole for IdentityRole:
            var idResult = _roleManager.Create(new IdentityRole(name));
            return idResult.Succeeded;
        }


        public bool CreateUser(IdentityUser user, string password)
        {
            var idResult = _userManager.Create(user, password);
            return idResult.Succeeded;
        }


        public bool AddUserToRole(string userId, string roleName)
        {
            var idResult = _userManager.AddToRole(userId, roleName); 
            return idResult.Succeeded;
        }


        public void ClearUserRoles(string userId)
        {
            var user = _userManager.FindById(userId);
            var currentRoles = new List<IdentityUserRole>();

            var Db = new BikeFitContext();

            // Add all available roles to the list of EditorViewModels:
            var allRoles = Db.Roles;

            currentRoles.AddRange(user.Roles);
            foreach (var role in currentRoles)
            {
                var roleName = allRoles.First(r => r.Id == role.RoleId).Name;
                _userManager.RemoveFromRole(userId, roleName);
            }
        }


        public void RemoveFromRole(string userId, string roleName)
        {
            _userManager.RemoveFromRole(userId, roleName);
        }


        public void DeleteRole(string roleId)
        {
            var roleUsers = _db.Users.Where(u => u.Roles.Any(r => r.RoleId == roleId));
            var role = _db.Roles.Find(roleId);

            foreach (var user in roleUsers)
            {
                RemoveFromRole(user.Id, role.Name);
            }
            _db.Roles.Remove(role);
            _db.SaveChanges();
        }
    }
}