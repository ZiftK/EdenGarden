from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from .database import Base

class Employee(Base):
    __tablename__ = "empleado"

    id_empleado = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    email = Column(String, unique=True)
    telefono = Column(String)
    rol = Column(String)
    puesto = Column(String)
    salario = Column(Integer)
    fecha_contratacion = Column(Date)
    fecha_salida = Column(Date, nullable=True)
    fecha_recontratacion = Column(Date, nullable=True)
    fk_equipo = Column(Integer, ForeignKey("equipo.id_equipo"), nullable=True)
    img = Column(String, nullable=True)
    expediente = Column(String, unique=True)
    clave = Column(String)

    # Relationships
    equipo = relationship("Team", back_populates="empleados")
    asistencias = relationship("Attendance", back_populates="empleado")
    nominas = relationship("Payroll", back_populates="empleado")