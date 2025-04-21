import { useEffect, useState } from "react";
import SideBar from "@/components/sidebaradmin";
import iUser from "@/model/interfaces/iUser";

function Admin() {
  const [user, setUser] = useState<iUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser) as iUser);
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <SideBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {user ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Bienvenido, {user.username}!</h1>
                  <p className="text-gray-600">Rol: {user.rol}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Panel de Administración</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Tarjetas de resumen */}
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <h3 className="font-medium text-indigo-800">Usuarios Registrados</h3>
                    <p className="text-2xl font-bold mt-2 text-indigo-600">24</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="font-medium text-green-800">Productos Activos</h3>
                    <p className="text-2xl font-bold mt-2 text-green-600">156</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-800">Órdenes Hoy</h3>
                    <p className="text-2xl font-bold mt-2 text-blue-600">12</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-xl font-medium text-gray-800 mt-4">Acceso Restringido</h2>
              <p className="text-gray-600 mt-2">Debes iniciar sesión como administrador para acceder a este panel</p>
              <a 
                href="/login" 
                className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md shadow-sm transition-colors"
              >
                Iniciar Sesión
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Admin;