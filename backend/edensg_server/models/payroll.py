from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from .database import Base

class Payroll(Base):
    __tablename__ = "nomina"

    id_nomina = Column(Integer, primary_key=True, index=True)
    fk_empleado = Column(Integer, ForeignKey("empleado.id_empleado"))
    fecha_inicio = Column(Date)
    fecha_fin = Column(Date)
    horas_trabajadas = Column(Float)
    horas_extra = Column(Float)
    salario_base = Column(Float)
    salario_extra = Column(Float)
    total = Column(Float)
    estado = Column(String, default="generada")  # generada, pagada

    # Relationships
    empleado = relationship("Employee", back_populates="nominas")
