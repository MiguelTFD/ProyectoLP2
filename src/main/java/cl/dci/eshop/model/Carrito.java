package cl.dci.eshop.model;

import cl.dci.eshop.auth.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "carrito")
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "carrito_id")
    private int id;
    @Column
    private int cantidadProductos;
    @Column
    private int precioTotal;


    @OneToMany(mappedBy = "carrito")
    private List<ProductoCarrito> productoCarritos;


    @OneToOne()
    @JoinTable(name = "user_carrito",
            joinColumns = {@JoinColumn(name = "carrito_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private User user;

    public Carrito() {
        this.cantidadProductos = 0;
        this.precioTotal = 0;

        this.productoCarritos = new ArrayList<>();

    }

    public List<ProductoCarrito> getProductoCarritos() {
        return productoCarritos;
    }

    public void setProductoCarritos(List<ProductoCarrito> productoCarritos) {
        this.productoCarritos = productoCarritos;
    }


    public void addProducto(Producto producto){
        this.precioTotal += producto.getPrecio();
        this.cantidadProductos++;
        //this.productos.add(producto);
    }

    public void deleteProducto(Producto producto){
        this.precioTotal -= producto.getPrecio();
        this.cantidadProductos--;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCantidadProductos() {
        return cantidadProductos;
    }

    public void setCantidadProductos(int cantidadProductos) {
        this.cantidadProductos = cantidadProductos;
    }

    public int getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(int precioTotal) {
        this.precioTotal = precioTotal;
    }


    @Override
    public String toString() {
        return "Carrito{" +
                "id=" + id +
                ", cantidadProductos=" + cantidadProductos +
                ", precioTotal=" + precioTotal +
                //", productos=" + productos +
                //", user=" + user +
                '}';
    }
}
