"""
En este archivo se definen las bases de datos como esquema sqlalchemy.
Se utiliza junto a alembic para versionar las migraciones del esquema.
"""

from dotenv import load_dotenv
import os

from sqlalchemy import create_engine, Column, Integer, VARCHAR, Date as sqlaDate, Float, ForeignKey, VARCHAR
from sqlalchemy.orm import declarative_base

load_dotenv()

database_url = os.getenv("DB_URL")

engine = create_engine(database_url)

# declarative base model
Base = declarative_base()



# models
class Employee(Base):

    __tablename__ = "TEmployee"
    __table_args__ = {
        "schema": "admin"
    }

    id = Column("idEmployee", Integer, primary_key=True)
    name = Column(VARCHAR(50), nullable=False)
    address = Column(VARCHAR(255))
    phone_number = Column("phoneNumber", VARCHAR(10))
    email = Column(VARCHAR(30))
    hire_date = Column("hireDate", sqlaDate, nullable=False)
    role = Column(Integer, ForeignKey("admin.TEmployeeRole.idRole", ondelete="SET NULL", onupdate="CASCADE"), nullable=False)
    salary = Column(Float, nullable=False)
    in_date = Column("inDate", sqlaDate)
    out_date = Column("outDate", sqlaDate)

class Role(Base):

    __tablename__ = "TEmployeeRole"
    __table_args__ = {
        "schema": "admin"
    }

    id_role = Column("idRole" ,Integer, primary_key=True, autoincrement="auto")
    name = Column(VARCHAR(30), nullable=False)

class Licenses(Base):
    __tablename__ = "TEmployeeLicense"
    __table_args__ = {
        "schema": "admin"
    }

    id_license = Column("idLicense", Integer, primary_key=True, autoincrement="auto")
    name = Column(VARCHAR(30), nullable=False)
    description = Column(VARCHAR(255), nullable=True)

class EmployeeLicensesMid(Base):
    __tablename__ = "TEmployeeLicensesMid"
    __table_args__ = {
        "schema": "admin"
    }

    id_employee = Column(
        "idEmployee",
        Integer, 
        ForeignKey("admin.TEmployee.idEmployee", ondelete="SET NULL", onupdate="CASCADE"),
        primary_key=True
        )
    id_license = Column(
        "idLicense",
        Integer,
        ForeignKey("admin.TEmployeeLicense.idLicense", ondelete="SET NULL", onupdate="CASCADE"),
        primary_key=True
    )

class Team(Base):
    __tablename__ = "TTeam"
    __table_args__ = {
        "schema": "admin"
    }

    id_team = Column("idTeam", Integer, autoincrement=True, primary_key=True)
    name = Column(VARCHAR(30), nullable=False)
    leader = Column(Integer, ForeignKey("admin.TEmployee.idEmployee", ondelete="SET NULL", onupdate="CASCADE"))

class EmployeeTeamMid(Base):
    __tablename__ = "TEmployeeTeamMid"
    __table_args__ = {
        "schema":"admin"
    }

    id_team = Column("idTeam", Integer, ForeignKey("admin.TTeam.idTeam", ondelete="SET NULL", onupdate="CASCADE"), primary_key=True)
    id_employee = Column("idEmployee", Integer, ForeignKey("admin.TEmployee.idEmployee", ondelete="SET NULL", onupdate="CASCADE"), primary_key=True)

class Project(Base):
    __tablename__ = "TProject"
    __table_args__ = {
        "schema": "admin"
    }

    id_project = Column("idProject", Integer, primary_key=True, autoincrement=True)
    name = Column(VARCHAR(50), nullable=False)

class CurrentProjectTeams(Base):
    __tablename__ = "TCurrentProjectTeams"
    __table_args__ = {
        "schema":"admin"
    }

    id_project = Column(
        "idProject",
        Integer, 
        ForeignKey(
            "admin.TProject.idProject", 
            onupdate="CASCADE", 
            ondelete="SET NULL"
            ), 
        primary_key=True
    )
    
    id_team = Column(
        "idTeam",
        Integer,
        ForeignKey(
            "admin.TTeam.idTeam",
            onupdate="CASCADE",
            ondelete="SET NULL"
        ),
        primary_key=True
    )

if __name__ == "__main__":
    Base.metadata.create_all(engine)
    #TODO: revisar la ruta de la base de datos en alembic