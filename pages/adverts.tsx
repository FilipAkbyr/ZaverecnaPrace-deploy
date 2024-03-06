import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, Skeleton, Typography } from '@mui/material';
import { House, useHousesQueryQuery, useUserDataQuery } from '../generated/graphql';
import Navbar from '../components/navbar';
import Link from 'next/link';
import { Container } from '@mui/material';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import DeleteIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { useDeleteHouseMutationMutation } from '../generated/graphql';
import { ToastContainer, toast } from 'react-toastify';
import { authUtils } from '../firebase/auth-utils';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../firebase/config';
import { Maybe } from 'graphql-yoga';
import Image from "next/image";


const PropertyList = () => {
  const [properties, setProperties] = useState<House[]>([]);
  const { data, loading } = useHousesQueryQuery();
  const [deleteHouseMutation] = useDeleteHouseMutationMutation();
  const user = authUtils.getCurrentUser();
  const userData = useUserDataQuery({variables: {email: user?.email ?? ""}}).data?.user;
  const [isAdmin, setIsAdmin] = useState(false);

  const [imageList, setImageList] = useState<Map<string, string>>(new Map<string, string>());
  
  useEffect(() => {
    if (properties.length === 0) {
      return; // No need to fetch images if there are no properties
    }

    const fetchImages = async () => {
      for (const property of properties) {
        const imageDir = `images/${property.id}`;
        const imageListRef = ref(storage, imageDir);
        const res = await listAll(imageListRef);

        if (res.items.length > 0) {
          const firstItem = res.items[0];
          const url = await getDownloadURL(firstItem);
          setImageList((prev) => new Map(prev.set(property.id!, url)));
        }
      }
    };

    fetchImages();
  }, [properties]);

  console.log(user);
  console.log(imageList);
console.log(userData);
  const handleDeleteClick = async (propertyId: string | null | undefined) => {
    if (!propertyId) return;
    try {
      await deleteHouseMutation({ variables: { propertyId: propertyId } });
      setProperties(properties.filter(property => property.id !== propertyId));
      toast.success('Property deleted successfully', {containerId: "advertsToastId", position: "top-right", autoClose: 2000});
    } catch (error) {
      toast.error('Property could not be deleted', {containerId: "advertsToastId", position: "top-right", autoClose: 2000});
    }
  };

  useEffect(() => {
    if (!loading)
    {
      setProperties(data?.properties as House[]);
      setIsAdmin(userData?.role === 'Admin');
    }
  }, [data?.properties, loading, userData]);

  console.log(properties);

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Box>
        <ToastContainer containerId={"advertsToastId"}/>
        </Box>
        
        {isAdmin ? (
          <Button
            variant="contained"
            href="propertyadd"
            sx={{
              position: "relative",
              marginTop: "20px",
              marginLeft: "1088px",
              marginBottom: "20px",
              backgroundColor: "#3562a6",
            }}
          >
            <BsFillPlusSquareFill /> 
          </Button>
        ) : null}
        {loading ? (
          <Skeleton
            animation="wave"
            height={100}
            width="40%"
          />
        ) : (
          <Grid container spacing={2} sx={{ paddingTop: isAdmin ? 0 : '40px' }}>
            {
              properties?.map(property => (
                <Grid key={property.id} item xs={12} md={6} lg={4}>
                  <Paper>
                    <Container>
                      Description:
                      <Link style={{ textDecoration: "none" }} href={{ pathname: "propertydetail/[id]", query: { id: property.id } }} as={`propertydetail/${property.id}`}>
                        <Typography variant="h5" gutterBottom>
                          {property.description}
                        </Typography>
                      </Link>
                    </Container>
                    {imageList.has(property.id!) ?
                      <Container>
                        <Image
                          style={{ borderRadius: "10px" }}
                          width={260}
                          height={190}
                          src={imageList.get(property.id!)!}
                          alt={`property-${property.id}`}
                        />
                      </Container> : null
                    }
                    <Container>
                      <Typography variant="body1" color="text.secondary">
                        City: {property.city}
                      </Typography>
                    </Container>
                    <Container>
                      <Typography variant="body1" color="text.secondary">
                        Price: {property.price} Kč
                      </Typography>
                    </Container>
                    {isAdmin ? (
                  <DeleteIcon
                    sx={{
                      position: "relative", left: "90%", transform: "scale(1)",
                      transition: "left 0.3s ease-in-out, transform 0.3s ease-in-out, filter 0.3s ease-in-out",
                      ":hover": {
                        transform: "scale(1.1)",
                        filter: "brightness(1.2)",
                      },
                    }}
                    onClick={() => handleDeleteClick(property.id)}
                  />
                ) : null}
                  </Paper>
                </Grid>
              ))
            }
          </Grid>
        )}
      </Container>
    </>
  );
};

export default PropertyList;

